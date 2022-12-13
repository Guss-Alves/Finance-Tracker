const Expense = require('../models/expense.model');
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const {SECRET_KEY} = require('../config/jwt.config')

module.exports.showAllExpenses = (req, res)=>{
    Expense.find()
        .populate('user_id', 'firstName')
        .then(allExpenses =>{res.json({results : allExpenses})})
        .catch(error =>{res.json(error)})
}

module.exports.showAllExpensesOfUser = async (req,res)=>{
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
    let foundUser = await User.findOne({_id: decodedJWT.payload.id});
    Expense.find({user_id: foundUser})
    // .sort({date:-1})
        .then(expenses=>{
            res.json({results: expenses})
        })
        .catch(err=>{
            res.json(err)
        })
}

// module.exports.showAllExpensesOfUser = (req, res)=>{
//     Expense.find({user_id:req.params.userId})
//         .populate('user_id', 'firstName')
//         .then(allExpenses =>{res.json({results : allExpenses})})
//         .catch(error =>{res.json(error)})
// }

module.exports.createExpense = async (req, res)=>{
    const decodedJWT = jwt.decode(req.cookies.usertoken, {complete: true});
    let foundUser = await User.findOne({_id: decodedJWT.payload.id});
    let {...expenseData} = req.body;
    // console.log('exp data', expenseData)
    expenseData.user_id = foundUser;
    Expense.create(expenseData)
        .then(newExpense =>{res.json({results: newExpense})})
        .catch(error =>{res.json(error)})
}

// module.exports.createNewExpense = (req, res) =>{
//     Expense.create(req.body)
//         .then(newExpense =>{res.json({results: newExpense})})
//         .catch(error =>{res.json(error)})
// }


module.exports.deleteExpense = (req, res)=>{
    Expense.findByIdAndDelete({_id:req.params.id})
        .then(deletedExpense =>{
            res.json({results: deletedExpense})
        })
        .catch(error =>{res.json(error)})
}

