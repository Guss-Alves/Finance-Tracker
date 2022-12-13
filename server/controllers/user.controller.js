const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

module.exports.showAllUsers = (req, res) => {
    User.find()
        .then(allUsers => { res.json({ results: allUsers }) })
        .catch(error => { res.json(error) })
}

module.exports.register = (req, res) => {
    User.create(req.body)
        .then(user => {
            const usertoken = jwt.sign({
                id: user._id
            }, process.env.SECRET_KEY);

            res
                .cookie("usertoken", usertoken, process.env.SECRET_KEY, {
                    httpOnly: true
                })
                .json({ msg: "success!", user: user });
        })
        .catch(err => res.json(err));
}

module.exports.login = async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
        // email not found in users collection
        return res.json({error: "User not found, please try again !"});
    }
    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(req.body.password, user.password);
    if (!correctPassword) {
        // password wasn't a match!
        return res.json({error: "Password is incorrect"});
    }
    // if we made it this far, the password was correct
    const usertoken = jwt.sign({
        id: user._id,
        firstName: user.firstName
    }, process.env.SECRET_KEY);
    // note that the response object allows chained calls to cookie and json
    res
        .cookie("usertoken", usertoken, process.env.SECRET_KEY, {
            httpOnly: true
        })
        .json({ msg: "success!" });
}

module.exports.getLoggedInUser = (req, res)=>{
    //Use the info stored in the cookie to get the id of the logged in user and query the db to find a user with that id
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete:true})
    User.findOne({_id: decodedJWT.payload.id})
        .then(foundUser =>{
            res.json({results: foundUser})})
        .catch(error => { res.json(error) })
}

module.exports.logout = (req, res) => {
    res.clearCookie('usertoken');
    res.sendStatus(200);
}

module.exports.deleteUser = (req, res) => {
    User.findByIdAndDelete({ _id: req.params.id })
        .then(deletedUser => {
            res.json({ results: deletedUser })
        })
        .catch(error => { res.json(error) })
}


