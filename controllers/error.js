exports.get404 = function (req, res) {
    res.status(404).render('404', {
        pageTitle: 'Page not found'
    })
}