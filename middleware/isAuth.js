module.exports = function (req, res) {
    if (!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    next();
}