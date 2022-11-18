const renderDashboard = (req,res) => {
    res.render('dashboard.hbs')
}
const renderLogin = (req,res) => {
    res.render('login.hbs')
}
module.exports = {
    renderDashboard,
    renderLogin
}