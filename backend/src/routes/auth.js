const express = require('express');
const router = express.Router();

// Mock authentication endpoints for demo

// Send verification code
router.post('/send-verification', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    
    // Simulate sending SMS
    console.log(`Sending verification code to ${phone}`);
    
    res.json({
      message: 'Verification code sent successfully',
      phone: phone
    });
  } catch (error) {
    console.error('Send verification error:', error);
    res.status(500).json({ message: 'Failed to send verification code' });
  }
});

// Verify phone number
router.post('/verify-phone', async (req, res) => {
  try {
    const { phone, code } = req.body;
    
    if (!phone || !code) {
      return res.status(400).json({ message: 'Phone number and code are required' });
    }
    
    // Mock verification - accept any 6-digit code
    if (code.length !== 6) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }
    
    // Mock user data
    const user = {
      id: 'user_' + Date.now(),
      phone: phone,
      name: 'Demo User',
      username: 'demo_user',
      trustScore: 95,
      createdAt: new Date().toISOString()
    };
    
    // Mock tokens
    const accessToken = 'demo_access_token_' + Date.now();
    const refreshToken = 'demo_refresh_token_' + Date.now();
    
    res.json({
      message: 'Phone verified successfully',
      accessToken,
      refreshToken,
      user
    });
  } catch (error) {
    console.error('Verify phone error:', error);
    res.status(500).json({ message: 'Failed to verify phone number' });
  }
});

// Create user profile
router.post('/signup', async (req, res) => {
  try {
    const { phone, name, username, email, bio, interests } = req.body;
    
    if (!phone || !name || !username) {
      return res.status(400).json({ message: 'Phone, name, and username are required' });
    }
    
    // Mock user creation
    const user = {
      id: 'user_' + Date.now(),
      phone,
      name,
      username,
      email: email || null,
      bio: bio || null,
      interests: interests || [],
      trustScore: 75, // Starting trust score
      socialAccounts: [],
      createdAt: new Date().toISOString()
    };
    
    // Mock tokens
    const accessToken = 'demo_access_token_' + Date.now();
    const refreshToken = 'demo_refresh_token_' + Date.now();
    
    res.status(201).json({
      message: 'User created successfully',
      accessToken,
      refreshToken,
      user
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Failed to create user account' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const { phone } = req.body;
    
    if (!phone) {
      return res.status(400).json({ message: 'Phone number is required' });
    }
    
    // Mock login - simulate existing user
    console.log(`Login attempt for ${phone}`);
    
    res.json({
      message: 'Login initiated, verification code will be sent',
      phone: phone
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Failed to initiate login' });
  }
});

// Refresh token endpoint
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }
    
    // Mock token refresh
    const newAccessToken = 'demo_access_token_' + Date.now();
    const newRefreshToken = 'demo_refresh_token_' + Date.now();
    
    res.json({
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    });
  } catch (error) {
    console.error('Token refresh error:', error);
    res.status(500).json({ message: 'Failed to refresh token' });
  }
});

module.exports = router; 