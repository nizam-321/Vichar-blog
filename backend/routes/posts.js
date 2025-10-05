//path: backend/routes/posts.js
const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const verifyToken = require('../middleware/verifyToken');
const upload = require('../middleware/upload');

// Get all public posts (feed)
router.get('/all', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ isPublic: true })
      .populate('author', 'email')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    console.error('Fetch all posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get logged-in user's posts only
router.get('/', verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.userId })
      .populate('author', 'email')
      .sort({ createdAt: -1 });
    
    res.json(posts);
  } catch (error) {
    console.error('Fetch user posts error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single post by ID
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'email');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error('Fetch single post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new post with image upload
router.post('/', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const { title, content, isPublic } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    // Create new post
    const newPost = new Post({
      title: title.trim(),
      content: content.trim(),
      image: req.file ? req.file.filename : '',
      isPublic: isPublic === 'true' || isPublic === true,
      author: req.user.userId
    });

    const savedPost = await newPost.save();
    await savedPost.populate('author', 'email');
    
    res.status(201).json(savedPost);
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete post by ID
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user.userId
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Delete post error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;