const express = require('express');
const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // For testing - just echo back the attempt
    res.json({ 
      success: true, 
      message: 'Login successful',
      user: { email }
    });
  } catch (err) {
    res.status(400).json({ 
      success: false, 
      message: 'Login failed', 
      error: err.message 
    });
  }
});

// POST /api/auth/register 
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // For testing - just echo back the attempt
    res.json({
      success: true,
      message: 'Registration successful',
      user: { name, email }
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Registration failed',
      error: err.message
    });
  }
});

module.exports = router;
