const Activity = require('../models/activity');
const Expense = require('../models/expense');
const Friend = require('../models/friend');
const Group = require('../models/group');
const User = require('../models/user');

const groupController = require('./group');
const friendController = require('./friend');

exports.addExpense = async (req, res, next) => {
  try {
    const {friendId, groupId} = req.params;
    const {title, amount, category, currency, description, splitBy, paidBy, splitMethod} = req.body;
    const newExpense = { title, amount, category, currency, description, splitBy, paidBy, createdBy: req.userId, splitMethod };
    newExpense.belongsType = friendId ? "Friend" : "Group";
    newExpense.belongsTo = friendId || groupId;
    const concernedSet = new Set();
    splitBy.forEach(split => { split.amount > 0 && concernedSet.add(split.user) });
    paidBy.forEach(paid => { paid.amount > 0 && concernedSet.add(paid.user) });
    const expense = await Expense.create(newExpense);
    const activity = await Activity.create({actType: "expense", operation: "create", refId: expense._id, concerned: Array.from(concernedSet)});
    if(friendId) {
      await Friend.findByIdAndUpdate(friendId, {$push: { "activities": activity._id} });
      await friendController.calculateTotals(friendId);
    }
    else if(groupId) {
      await Group.findByIdAndUpdate(groupId, {$push: { "activities": activity._id} });
      await groupController.calculateTotals(groupId);
    }
    return res.status(201).json({ msg: "Expense Saved!", expense });        
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg: "Internal server error!"});
  }
}

exports.getExpense = async (req, res, next) => {
  const {id} = req.params;
  try {
    const expense = await Expense.findById(id).populate('createdBy', 'name').populate({ path: 'splitBy.user', model: 'User', select: 'name.full picture' }).populate({ path: 'paidBy.user', model: 'User', select: 'name.full picture' }).exec();
    return res.status(200).json({msg: "Expense Found", expense})
  } catch (error) {
    console.log(error);
  }
}

exports.getExpenseMeta = async (req, res, next) => {
  const {refId} = req.params;
  try {
    const expense = await Expense.findById(refId).select('title amount category currency createdBy').populate('createdBy','name');
    console.log(expense);
    return res.status(200).json({results: expense, msg: "Expense Found!"});
  } catch (error) {
    next(error);
  }
};