const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.getLogin = function (req, res) {
    res.render('login', {
        isAuthenticated: false
    });
}

exports.getSignup = function (req, res) {
    res.render('signup', {
        isAuthenticated: false
    })
}

exports.postLogin = function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({
            email: email
        })
        .then(user => {
            if (!user) {
                return res.redirect('login');
            }
            bcrypt
                .compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    res.redirect('/login');
                });
        })
        .catch(err => console.log(err));
}

exports.postLogout = function (req, res) {
    req.session.destroy(err => {
        console.log(err);
        res.render('shop', {
            isAuthenticated: false
        })
    })
}



exports.postSignup = function (req, res) {
    const email = req.body.email;
    const password = req.body.password
    User.findOne({
        email: email
    }).then(userDoc => {
        if (userDoc) {
            return res.redirect('/signup')
        }
        return bcrypt
            .hash(password, 10)
            .then(hashedPassword => {
                const user = new User({
                    email: email,
                    password: hashedPassword,
                    cart: {
                        items: []
                    }
                });
                return user.save();
            }).then(result => {
                res.redirect('login')
            }).catch(err => {
                console.log(err);
            })
    })
}