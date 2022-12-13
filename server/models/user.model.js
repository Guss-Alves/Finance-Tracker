const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName :{
        type: String,
        required:[true, 'First name is required'],
        minlength: [2, 'First name must be at least 2 characters long']
    },
    lastName :{
        type: String,
        required:[true, 'The last name is required'],
        minlength: [2, 'The Last name must be at least 2 characters long']
    },
    email: {
        type: String,
        required: [true, 'Email address is required'],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be at least 8 characters long']
    }

}, {timestamps:true})

// here is the function to confirm the passsword
UserSchema.virtual('confirm')
    .get( () => this._confirm )
    .set( value => this._confirm = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirm) {
        this.invalidate('confirm', 'Both passwords must match');
        }
        next();
    });
    
//here is the function to create a hash password, and protect the user's information
UserSchema.pre('save', async function (next) {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error){
        next(error)
    }
    })

//here is the function to check if the entered email already exist in our database
UserSchema.path('email').validate(async (email)=>{
    const emailCount = await mongoose.models.User.countDocuments({ email })
    return !emailCount
}, 'This email is already being used' )


// const User = mongoose.model('User', UserSchema);// example
const User = mongoose.model('User', UserSchema)

// module.exports = User; //example
module.exports = User;