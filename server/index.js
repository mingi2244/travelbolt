const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production';
const SESSION_SECRET = process.env.SESSION_SECRET || 'your-super-secret-session-key-change-in-production';

// In-memory user storage (replace with database in production)
let users = [];
let userIdCounter = 1;

// Load users from file if exists
const loadUsers = async () => {
  try {
    const data = await fs.readFile(path.join(__dirname, 'users.json'), 'utf8');
    const userData = JSON.parse(data);
    users = userData.users || [];
    userIdCounter = userData.counter || 1;
  } catch (error) {
    console.log('No existing users file, starting fresh');
  }
};

// Save users to file
const saveUsers = async () => {
  try {
    await fs.writeFile(
      path.join(__dirname, 'users.json'), 
      JSON.stringify({ users, counter: userIdCounter }, null, 2)
    );
  } catch (error) {
    console.error('Error saving users:', error);
  }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true in production with HTTPS
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.cookies.authToken || req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Helper function to find user by email
const findUserByEmail = (email) => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

// Helper function to create user response (without password)
const createUserResponse = (user) => {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Routes

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email, and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Check if user already exists
    if (findUserByEmail(email)) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const newUser = {
      id: userIdCounter++,
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      preferences: {
        favoriteDestinations: [],
        travelStyle: '',
        lastSearches: []
      }
    };

    users.push(newUser);
    await saveUsers();

    // Create JWT token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false, // Set to true in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'lax'
    });

    // Store in session
    req.session.userId = newUser.id;

    res.status(201).json({
      message: 'User registered successfully',
      user: createUserResponse(newUser),
      token
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error during registration' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user
    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Update last login
    user.lastLogin = new Date().toISOString();
    await saveUsers();

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Set cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: false, // Set to true in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'lax'
    });

    // Store in session
    req.session.userId = user.id;

    res.json({
      message: 'Login successful',
      user: createUserResponse(user),
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error during login' });
  }
});

// Check session
app.get('/api/auth/check-session', (req, res) => {
  const token = req.cookies.authToken;
  
  if (!token) {
    return res.status(401).json({ message: 'No token found' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = users.find(u => u.id === decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    res.json({
      message: 'Session valid',
      user: createUserResponse(user)
    });
  });
});

// Logout
app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('authToken');
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destruction error:', err);
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Get user profile
app.get('/api/auth/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({
    user: createUserResponse(user)
  });
});

// Update user profile
app.put('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const { name, preferences } = req.body;
    const user = users.find(u => u.id === req.user.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user data
    if (name) user.name = name.trim();
    if (preferences) user.preferences = { ...user.preferences, ...preferences };

    await saveUsers();

    res.json({
      message: 'Profile updated successfully',
      user: createUserResponse(user)
    });

  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Internal server error during profile update' });
  }
});

// Get all users (admin only - for development)
app.get('/api/auth/users', (req, res) => {
  const usersWithoutPasswords = users.map(createUserResponse);
  res.json({ users: usersWithoutPasswords });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    users: users.length 
  });
});

// Initialize and start server
const startServer = async () => {
  await loadUsers();
  
  app.listen(PORT, () => {
    console.log(`🚀 Authentication server running on port ${PORT}`);
    console.log(`📊 Loaded ${users.length} users from storage`);
    console.log(`🔐 JWT Secret: ${JWT_SECRET.substring(0, 10)}...`);
  });
};

startServer().catch(console.error);