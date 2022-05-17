exports.get404 = function (req, res) {
    res.status(404).render('404', {
        isAuthenticated: req.session.isLoggedIn,
        pageTitle: 'Page not found'
    })
}