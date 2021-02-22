const router = require('express').Router();

// Register User
router.post('/register', (req, res) => {
	res.json({ msg: 'Register a User' });
});

// Login User
router.post('/login', (req, res) => {
	res.json({ msg: 'User Login' });
});

module.exports = router;
