exports.get404 = function (req, res) {
    res.status(404).render('404', {
        isAuthenticated: false,
        pageTitle: 'Page not found'
    })
}