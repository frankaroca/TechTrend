const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// Allow capability to retrieve posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: Comment,
                attributers: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postInfo => res.json(postInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to retrieve posts based on a specific ID
router.get('/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
        .then(postInfo => {
            if (!postInfo) {
                res.status(404).json({ message: 'There is no post associated with this ID' });
                return;
            }
            res.json(postInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to create a new post
router.post('/', (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
    })
        .then(postInfo => res.json(postInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to edit an existing post's title and content
router.put('/:id', (req, res) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(postInfo => {
            if (!postInfo) {
                res.status(404).json({ message: 'There is no post associated with this ID' });
                return;
            }
            res.json([postInfo]);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to delete a post based on a specific ID
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(postInfo => {
            if (!postInfo) {
                res.status(404).json({ message: 'There is no post associated with this ID' });
                return;
            }
            res.json(postInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;