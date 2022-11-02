const router = require('express').Router(); 
const withAuth = require('../../utils/auth'); 
const Comment = require('../../models/Comment'); 

router.post('/', withAuth, async (req, res) => {
    try {
        const comment = await Comment.create ({
            ...req.body,
            user_id: req.session.user_id
        })

        res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err.message);
  }
    
});

module.exports = router; 