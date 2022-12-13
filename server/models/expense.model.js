const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    name :{
        type: String,
        required:[true, 'The expense name is required'],
        minlength: [2, 'The expense name must be at least 2 characters long']
    },
    // category: {
    //     type: String,
    //     required: [true, 'The expense category is required']
    // },
    category: {
        type: String,
        enum: {
            values: [
                "Rent and Utilities", 
                "Investing",
                "Grocery",
                "Gas", 
                "Dining", 
                "Car", 
                "Social", 
                "Education", 
                "Health", 
                "Transportation",
                "Travel", 
                "Entertainment", 
                "Insurance",
                "Style",
                "Other",
                ],
            message: '{VALUE} is not supported as a category'
        },
        required: [true, "Expense Category is required!"]
    },
    date: {
        type: Date,
        required:[true, 'Pick the date of this expense']
    },
    cost: {
        type: Number, 
        required:[true, 'The cost of your expense is required'],
        min:[1, 'The expense cost must be a positive number']
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {timestamps:true})

// const User = mongoose.model('User', UserSchema);// example
const Expense = mongoose.model('Expense', ExpenseSchema)

// module.exports = User; //example
module.exports = Expense;