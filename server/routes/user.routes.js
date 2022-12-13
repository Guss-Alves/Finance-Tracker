const UserController = require('../controllers/user.controller');

module.exports = (app)=>{
    app.get('/api/users', UserController.showAllUsers),
    app.post('/api/user/new', UserController.register),
    app.post('/api/user/login', UserController.login),
    app.get('/api/user/getloggedinuser', UserController.getLoggedInUser),
    app.get('/api/user/logout', UserController.logout),
    app.delete('/api/user/delete/:id', UserController.deleteUser)
}