const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

// Allow capability to retrieve users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    })
        .then(userInfo => res.json(userInfo))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to retrieve users based on a specific ID
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: ['id', 'title', 'content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            },
        ]
    })
        .then(userInfo => {
            if (!userInfo) {
                res.status(404).json({ message: 'There is no user associated with this ID' });
                return;
            }
            res.json(userInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to register new users
router.post('/', (req, res) => {
    // expects {username: 'Lernantino', password: 'password1234'}
    User.create({
        username: req.body.username,
        password: req.body.password
    })
        .then(userInfo => res.json(userInfo))
        .then(userInfo => {
            req.session.save(() => {
                req.session.user_id = userInfo.id;
                req.session.username = userInfo.username;
                req.session.loggedIn = true;
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to login existing users
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(userInfo => {
        if (!userInfo) {
            res.status(400).json({ message: 'There is no user with this username' });
            return;
        }
        // Check user credentials
        const validPassword = userInfo.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!' });
            return;
        }
        req.session.save(() => {
            // Enable session
            req.session.user_id = userInfo.id;
            req.session.username = userInfo.username;
            req.session.loggedIn = true;
            res.json({ user: userInfo, message: 'Logged in' });
        });
    });
});

// Allow capability to logout users
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

// Allow capability to update a current user based on a specific ID
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
        .then(userInfo => {
            if (!userInfo[0]) {
                res.status(404).json({ message: 'There is no user associated with this ID' });
                return;
            }
            res.json(userInfo);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// Allow capability to delete a current user based on a specific ID
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(userInfo => {
            if (!userInfo) {
                res.status(404).json({ message: 'There is no user associated with this ID' });
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