const express = require('express');
const router = express.Router();

// Mock users data
const mockUsers = [
  {
    id: 'user_1',
    name: 'Sarah Johnson',
    username: 'sarah_j',
    trustScore: 94,
    location: 'Phoenix, AZ',
    bio: 'Software engineer passionate about building great products',
    socialAccounts: [
      { platform: 'LinkedIn', verified: true, username: 'sarah-johnson' },
      { platform: 'GitHub', verified: true, username: 'sarahj' }
    ],
    stats: {
      reviews: 45,
      connections: 89,
      events: 12
    }
  },
  {
    id: 'user_2',
    name: 'Mike Davis',
    username: 'mike_d',
    trustScore: 87,
    location: 'Phoenix, AZ',
    bio: 'Marketing professional and community organizer',
    socialAccounts: [
      { platform: 'Twitter', verified: true, username: '@mike_davis' },
      { platform: 'LinkedIn', verified: false, username: 'mike-davis' }
    ],
    stats: {
      reviews: 32,
      connections: 156,
      events: 8
    }
  }
];

// Search users
router.get('/search', async (req, res) => {
  try {
    const { q, location, minTrustScore } = req.query;
    
    let filteredUsers = [...mockUsers];
    
    // Filter by search query
    if (q) {
      const query = q.toLowerCase();
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.username.toLowerCase().includes(query) ||
        user.bio.toLowerCase().includes(query)
      );
    }
    
    // Filter by location
    if (location) {
      filteredUsers = filteredUsers.filter(user => 
        user.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    // Filter by minimum trust score
    if (minTrustScore) {
      filteredUsers = filteredUsers.filter(user => 
        user.trustScore >= parseInt(minTrustScore)
      );
    }
    
    res.json({
      users: filteredUsers,
      total: filteredUsers.length
    });
  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({ message: 'Failed to search users' });
  }
});

// Get user profile
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
});

// Update user profile
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, bio, location } = req.body;
    
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user data
    if (name) mockUsers[userIndex].name = name;
    if (bio) mockUsers[userIndex].bio = bio;
    if (location) mockUsers[userIndex].location = location;
    
    res.json({
      message: 'Profile updated successfully',
      user: mockUsers[userIndex]
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ message: 'Failed to update profile' });
  }
});

// Get user's trust score breakdown
router.get('/:id/trust-score', async (req, res) => {
  try {
    const { id } = req.params;
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Mock trust score breakdown
    const breakdown = {
      overall: user.trustScore,
      factors: [
        { name: 'Social Media Verification', score: 85, weight: 20, color: 'blue' },
        { name: 'Community Network', score: 92, weight: 20, color: 'green' },
        { name: 'Platform Activity', score: 78, weight: 15, color: 'purple' },
        { name: 'Content Quality', score: 94, weight: 15, color: 'yellow' },
        { name: 'Time Investment', score: 88, weight: 10, color: 'red' },
        { name: 'Comment Engagement', score: 91, weight: 10, color: 'indigo' },
        { name: 'Event Participation', score: 76, weight: 5, color: 'pink' },
        { name: 'Validation Accuracy', score: 89, weight: 5, color: 'cyan' }
      ]
    };
    
    res.json(breakdown);
  } catch (error) {
    console.error('Get trust score error:', error);
    res.status(500).json({ message: 'Failed to fetch trust score' });
  }
});

// Add social account
router.post('/:id/social-accounts', async (req, res) => {
  try {
    const { id } = req.params;
    const { platform, username } = req.body;
    
    if (!platform || !username) {
      return res.status(400).json({ 
        message: 'Platform and username are required' 
      });
    }
    
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Add social account
    const newAccount = {
      platform,
      username,
      verified: false, // Would require verification process
      addedAt: new Date().toISOString()
    };
    
    mockUsers[userIndex].socialAccounts.push(newAccount);
    
    res.status(201).json({
      message: 'Social account added successfully',
      account: newAccount
    });
  } catch (error) {
    console.error('Add social account error:', error);
    res.status(500).json({ message: 'Failed to add social account' });
  }
});

// Remove social account
router.delete('/:id/social-accounts/:platform', async (req, res) => {
  try {
    const { id, platform } = req.params;
    
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Remove social account
    mockUsers[userIndex].socialAccounts = mockUsers[userIndex].socialAccounts.filter(
      account => account.platform.toLowerCase() !== platform.toLowerCase()
    );
    
    res.json({
      message: 'Social account removed successfully'
    });
  } catch (error) {
    console.error('Remove social account error:', error);
    res.status(500).json({ message: 'Failed to remove social account' });
  }
});

// Get nearby users
router.get('/nearby/:lat/:lng', async (req, res) => {
  try {
    const { lat, lng } = req.params;
    const { radius = 10 } = req.query; // radius in miles
    
    // Mock nearby users (in real app, would use geospatial queries)
    const nearbyUsers = [
      {
        id: 'user_3',
        name: 'Alex Chen',
        username: 'alex_c',
        trustScore: 88,
        distance: 0.5,
        profession: 'Software Developer'
      },
      {
        id: 'user_4',
        name: 'Maria Lopez',
        username: 'maria_l',
        trustScore: 94,
        distance: 1.2,
        profession: 'UX Designer'
      },
      {
        id: 'user_5',
        name: 'James Wilson',
        username: 'james_w',
        trustScore: 76,
        distance: 2.1,
        profession: 'Marketing Manager'
      }
    ];
    
    res.json({
      users: nearbyUsers,
      center: { lat: parseFloat(lat), lng: parseFloat(lng) },
      radius: parseInt(radius)
    });
  } catch (error) {
    console.error('Get nearby users error:', error);
    res.status(500).json({ message: 'Failed to fetch nearby users' });
  }
});

module.exports = router; 