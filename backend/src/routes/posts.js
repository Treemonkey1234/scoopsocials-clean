const express = require('express');
const router = express.Router();

// Mock posts data
const mockPosts = [
  {
    id: 'post_1',
    reviewer: 'John Smith',
    reviewerTrustScore: 95,
    reviewedPerson: 'Sarah Johnson',
    content: 'Great project partner, very reliable and always delivers quality work on time.',
    timestamp: '2 hours ago',
    votes: { up: 12, down: 3 },
    userVote: null,
    comments: 5,
    category: 'Professional',
    engagement: {
      agrees: 85,
      disagrees: 15,
      communityValidation: 85
    }
  },
  {
    id: 'post_2',
    reviewer: 'Mike Davis',
    reviewerTrustScore: 87,
    reviewedPerson: 'Lisa Rodriguez',
    content: 'Helpful mentor, always on time for our weekly check-ins. Highly recommend!',
    timestamp: '5 hours ago',
    votes: { up: 8, down: 7 },
    userVote: null,
    comments: 2,
    category: 'Professional',
    engagement: {
      agrees: 90,
      disagrees: 10,
      communityValidation: 90
    }
  },
  {
    id: 'post_3',
    reviewer: 'Emma Wilson',
    reviewerTrustScore: 92,
    reviewedPerson: 'David Chen',
    content: 'Excellent communicator and team player. Made our group project so much easier.',
    timestamp: '1 day ago',
    votes: { up: 15, down: 1 },
    userVote: null,
    comments: 8,
    category: 'Professional',
    engagement: {
      agrees: 96,
      disagrees: 4,
      communityValidation: 96
    }
  }
];

// Get all posts (reviews)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    
    let filteredPosts = [...mockPosts];
    
    // Filter by category if specified
    if (category && category !== 'all') {
      filteredPosts = filteredPosts.filter(post => 
        post.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);
    
    res.json({
      posts: paginatedPosts,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(filteredPosts.length / limit),
        totalPosts: filteredPosts.length,
        hasNext: endIndex < filteredPosts.length,
        hasPrev: startIndex > 0
      }
    });
  } catch (error) {
    console.error('Get posts error:', error);
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
});

// Get single post
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = mockPosts.find(p => p.id === id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Get post error:', error);
    res.status(500).json({ message: 'Failed to fetch post' });
  }
});

// Create new post (review)
router.post('/', async (req, res) => {
  try {
    const { reviewedPerson, content, category = 'General' } = req.body;
    
    if (!reviewedPerson || !content) {
      return res.status(400).json({ 
        message: 'Reviewed person and content are required' 
      });
    }
    
    // Mock new post
    const newPost = {
      id: 'post_' + Date.now(),
      reviewer: 'Current User', // Would come from auth token
      reviewerTrustScore: 95,
      reviewedPerson,
      content,
      timestamp: 'Just now',
      votes: { up: 0, down: 0 },
      userVote: null,
      comments: 0,
      category,
      engagement: {
        agrees: 0,
        disagrees: 0,
        communityValidation: 0
      }
    };
    
    // Add to mock data (in real app, would save to database)
    mockPosts.unshift(newPost);
    
    res.status(201).json({
      message: 'Review posted successfully',
      post: newPost
    });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Failed to create post' });
  }
});

// Vote on post
router.post('/:id/vote', async (req, res) => {
  try {
    const { id } = req.params;
    const { voteType } = req.body; // 'up' or 'down'
    
    if (!['up', 'down'].includes(voteType)) {
      return res.status(400).json({ message: 'Invalid vote type' });
    }
    
    const post = mockPosts.find(p => p.id === id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Remove previous vote if exists
    if (post.userVote === 'up') {
      post.votes.up--;
    } else if (post.userVote === 'down') {
      post.votes.down--;
    }
    
    // Add new vote
    if (post.userVote === voteType) {
      // Remove vote if clicking same button
      post.userVote = null;
    } else {
      // Add new vote
      post.userVote = voteType;
      if (voteType === 'up') {
        post.votes.up++;
      } else {
        post.votes.down++;
      }
    }
    
    res.json({
      message: 'Vote updated successfully',
      post: {
        id: post.id,
        votes: post.votes,
        userVote: post.userVote
      }
    });
  } catch (error) {
    console.error('Vote error:', error);
    res.status(500).json({ message: 'Failed to update vote' });
  }
});

// Add comment to post
router.post('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;
    
    if (!content) {
      return res.status(400).json({ message: 'Comment content is required' });
    }
    
    const post = mockPosts.find(p => p.id === id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    // Increment comment count (in real app, would save comment to database)
    post.comments++;
    
    const comment = {
      id: 'comment_' + Date.now(),
      author: 'Current User',
      content,
      timestamp: 'Just now',
      postId: id
    };
    
    res.status(201).json({
      message: 'Comment added successfully',
      comment
    });
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

module.exports = router; 