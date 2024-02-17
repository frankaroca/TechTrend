const router = require('express').Router();
const { Post, User, Comment } = require('../models');

// For the following: behaves similarly to postsPaths.js, simply inside of main page

// Allow capability to retrieve posts
router.get('/', (req, res) => {
    console.log(req.session);
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        .then(postInfo => {
            const posts = postInfo.map(post => post.get({ plain: true }));
            res.render('landingPage', {
                posts,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to direct users to main screen after logging in
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('loginPage');
});

// Allow capability to direct users to main screen after signing up
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signupPage');
});

// Allow capability to direct users to main screen after creating a new post
router.get('/addpost', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('createPost', {
        dashboard: true,
        loggedIn: true
    });
});

// Allow capability to direcrt users to main screen after editing an existing post
router.get('/editpost/:id', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ]
    })
        .then(postInfo => {
            if (!postInfo) {
                res.status(404).json({ message: 'There is no post associated with this ID' });
                return;
            }
            const post = postInfo.get({ plain: true });

            res.render('modifyPost', {
                post,
                dashboard: true,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to be returned to the main screen from the dashboard
router.get('/dashboard', (req, res) => {
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
            'created_at',
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        .then(postInfo => {
            const posts = postInfo.map(post => post.get({ plain: true }));
            console.log(posts);
            res.render('dashboard', {
                posts,
                dashboard: true,
                loggedIn: true
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to retrieve a post based on a specific ID
router.get('/post/:id', (req, res) => {
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
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
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
        .then(postInfo => {
            if (!postInfo) {
                res.status(404).json({ message: 'There is no post associated with this ID' });
                return;
            }
            const post = postInfo.get({ plain: true });

            res.render('newPost', {
                post,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;