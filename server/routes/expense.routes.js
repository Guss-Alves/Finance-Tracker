const ExpenseController = require('../controllers/expense.controller');
const {authenticate}= require('../config/jwt.config')

module.exports = (app)=>{
    app.get('/api/expenses', ExpenseController.showAllExpenses),

    app.post('/api/expense/new',authenticate, ExpenseController.createExpense),

    app.delete('/api/expense/delete/:id', ExpenseController.deleteExpense),

    app.get('/api/loggedUserExpenses', ExpenseController.showAllExpensesOfUser)
}