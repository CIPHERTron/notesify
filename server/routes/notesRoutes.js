const router = require('express').Router();

router.route('/')
	.get((req, res) => res.json({ msg: 'Test Notes' }))
	.post();

 router.route('/:id')
	.get((req, res) => res.json({ msg: 'Test Notes' }))
	.post();

module.exports = router;
