const express = require('express');
const router = express.Router();

// In-memory user store for testing
const users = [
  { id: 1, name: 'Admin', email: 'admin@example.com', password: 'admin123' }
];

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({ success: true, message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Login failed', error: err.message });
  }
});

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Log the received fields for debugging
    console.log('Received fields:', { name, email, password, confirmPassword });

    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, message: 'Passwords do not match' });
    }

    if (users.some(u => u.email === email)) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const newUser = { id: users.length + 1, name, email, password };
    users.push(newUser);

    res.status(201).json({ success: true, message: 'Registration successful', user: { id: newUser.id, name: newUser.name, email: newUser.email } });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Registration failed', error: err.message });
  }
});

module.exports = router;
