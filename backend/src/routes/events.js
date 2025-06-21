const express = require('express');
const router = express.Router();

// Mock events data
const mockEvents = [
  {
    id: 'event_1',
    title: 'Tech Meetup Tonight',
    description: 'Join fellow developers for networking, discussions, and demos of the latest tech projects.',
    date: new Date().toISOString().split('T')[0], // Today
    time: '19:00',
    location: 'Downtown Cafe',
    organizer: 'Tech Community Phoenix',
    organizerTrustScore: 92,
    goingCount: 12,
    maybeCount: 5,
    trustRequired: 85,
    category: 'Tech',
    attendees: []
  },
  {
    id: 'event_2',
    title: 'Community Pizza Night',
    description: 'Casual community gathering with free pizza! Great way to meet new people in a relaxed setting.',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    time: '18:00',
    location: 'Local Park',
    organizer: 'Community Builders',
    organizerTrustScore: 88,
    goingCount: 28,
    maybeCount: 12,
    trustRequired: 70,
    category: 'Social',
    attendees: []
  },
  {
    id: 'event_3',
    title: 'Art Gallery Opening',
    description: 'Exclusive opening of local artist showcase. Wine and networking with the creative community.',
    date: new Date(Date.now() + 432000000).toISOString().split('T')[0], // 5 days from now
    time: '18:30',
    location: 'Modern Art Museum',
    organizer: 'Phoenix Art Collective',
    organizerTrustScore: 95,
    goingCount: 45,
    maybeCount: 18,
    trustRequired: 90,
    category: 'Arts',
    attendees: []
  }
];

// Get all events
router.get('/', async (req, res) => {
  try {
    const { category, date, trustScore } = req.query;
    
    let filteredEvents = [...mockEvents];
    
    // Filter by category
    if (category && category !== 'all') {
      filteredEvents = filteredEvents.filter(event => 
        event.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by date
    if (date) {
      filteredEvents = filteredEvents.filter(event => event.date === date);
    }
    
    // Filter by trust score requirement
    if (trustScore) {
      const userTrustScore = parseInt(trustScore);
      filteredEvents = filteredEvents.filter(event => 
        event.trustRequired <= userTrustScore
      );
    }
    
    res.json({
      events: filteredEvents,
      total: filteredEvents.length
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Failed to fetch events' });
  }
});

// Get single event
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const event = mockEvents.find(e => e.id === id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    res.json(event);
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ message: 'Failed to fetch event' });
  }
});

// Create new event
router.post('/', async (req, res) => {
  try {
    const { 
      title, 
      description, 
      date, 
      time, 
      location, 
      trustRequired = 70, 
      category = 'General' 
    } = req.body;
    
    if (!title || !description || !date || !time || !location) {
      return res.status(400).json({ 
        message: 'Title, description, date, time, and location are required' 
      });
    }
    
    // Mock new event
    const newEvent = {
      id: 'event_' + Date.now(),
      title,
      description,
      date,
      time,
      location,
      organizer: 'Current User', // Would come from auth token
      organizerTrustScore: 95,
      goingCount: 0,
      maybeCount: 0,
      trustRequired: parseInt(trustRequired),
      category,
      attendees: []
    };
    
    // Add to mock data
    mockEvents.push(newEvent);
    
    res.status(201).json({
      message: 'Event created successfully',
      event: newEvent
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Failed to create event' });
  }
});

// RSVP to event
router.post('/:id/rsvp', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'going', 'maybe', 'not_going'
    
    if (!['going', 'maybe', 'not_going'].includes(status)) {
      return res.status(400).json({ message: 'Invalid RSVP status' });
    }
    
    const event = mockEvents.find(e => e.id === id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Mock user data
    const userId = 'current_user_id';
    const userTrustScore = 95;
    
    // Check trust score requirement
    if (userTrustScore < event.trustRequired) {
      return res.status(403).json({ 
        message: `Trust score of ${event.trustRequired} or higher required to attend this event`,
        userTrustScore,
        required: event.trustRequired
      });
    }
    
    // Remove user from all attendance lists first
    event.attendees = event.attendees.filter(a => a.userId !== userId);
    
    // Update counts (simplified - in real app would track individual users)
    if (status === 'going') {
      event.goingCount++;
      event.attendees.push({
        userId,
        status: 'going',
        timestamp: new Date().toISOString()
      });
    } else if (status === 'maybe') {
      event.maybeCount++;
      event.attendees.push({
        userId,
        status: 'maybe',
        timestamp: new Date().toISOString()
      });
    }
    
    res.json({
      message: `RSVP updated to ${status}`,
      event: {
        id: event.id,
        goingCount: event.goingCount,
        maybeCount: event.maybeCount,
        userStatus: status
      }
    });
  } catch (error) {
    console.error('RSVP error:', error);
    res.status(500).json({ message: 'Failed to update RSVP' });
  }
});

// Get event attendees
router.get('/:id/attendees', async (req, res) => {
  try {
    const { id } = req.params;
    const event = mockEvents.find(e => e.id === id);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Mock attendee data
    const attendees = {
      going: [
        { name: 'Sarah Johnson', trustScore: 94, avatar: '👤' },
        { name: 'Mike Davis', trustScore: 87, avatar: '👤' },
        { name: 'Emma Wilson', trustScore: 92, avatar: '👤' }
      ],
      maybe: [
        { name: 'Alex Chen', trustScore: 88, avatar: '👤' },
        { name: 'Lisa Rodriguez', trustScore: 91, avatar: '👤' }
      ]
    };
    
    res.json({
      eventId: id,
      attendees,
      counts: {
        going: event.goingCount,
        maybe: event.maybeCount
      }
    });
  } catch (error) {
    console.error('Get attendees error:', error);
    res.status(500).json({ message: 'Failed to fetch attendees' });
  }
});

module.exports = router; 