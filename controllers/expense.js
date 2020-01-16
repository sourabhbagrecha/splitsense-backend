const Expense = require('../models/expense');

exports.addExpense = async (req, res, next) => {
  try {
    const {title, amount, category, currency, description, splitBetween, paidBy, createdBy, splitMethod} = req.body;
    const expense = await Expense.create({ title, amount, category, currency, description, splitBetween, paidBy, createdBy, splitMethod })
    return res.status(201).json({ msg: "Expense Saved!", expense });        
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg: "Internal server error!"})
  }
}