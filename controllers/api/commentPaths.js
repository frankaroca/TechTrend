const router = require('express').Router();
const { Comment } = require('../../models');

// Allow capability to retrieve comments
router.get('/', (req, res) => {
    Comment.findAll()
        .then(userInfo => res.json(userInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to post comment
router.post('/', (req, res) => {
    // View current session
    if (req.session) {
        Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
            .then(commentInfo => res.json(commentInfo))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    }
});

// Allow capability to edit comment
router.put('/:id', (req, res) => {
    Comment.update(
        {
            comment_text: req.body.comment_text,
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(postInfo => {
            if (!postInfo) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(postInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to delete comment
router.delete('/:id', (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userInfo => {
            if (!userInfo) {
                res.status(404).json({ message: 'No comment found with this id' });
                return;
            }
            res.json(userInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;