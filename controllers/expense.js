const Activity = require('../models/activity');
const Expense = require('../models/expense');
const Friend = require('../models/friend');
const User = require('../models/user');

exports.getAddExpenseFriendData = async (req, res, next) => {
  const {friendId} = req.params;
  try {
    const friend = await Friend.findById(friendId);
    const participantsArray = [friend.requester, friend.accepter];
    const participants = await User.find({"_id": { $in : participantsArray }}).select('name picture');
    return res.status(200).json({participants, msg: "Participants found!"})
  } catch (error) {
    next(error);
  }
}

exports.addExpense = async (req, res, next) => {
  try {
    const {friendId, groupId} = req.params;
    const {title, amount, category, currency, description, splitBy, paidBy, splitMethod} = req.body;
    const newExpense = { title, amount, category, currency, description, splitBy, paidBy, createdBy: req.userId, splitMethod };
    if(friendId){
      newExpense.belongsType = "Friend";
      newExpense.belongsTo = friendId;
    } else if(friendId){
      newExpense.belongsType = "Group";
      newExpense.belongsTo = groupId;
    }
    const expense = await Expense.create(newExpense);
    const activity = await Activity.create({actType: "expense", operation: "create", refId: expense._id})
    if(friendId) {
      const friend = await Friend.findByIdAndUpdate(friendId, {$push: { "activities": activity._id} })
      console.log(await Friend.findById(friendId));
    }
    else if(groupId) {
      await Group.findByIdAndUpdate(groupId, {$push: { "activities": activity._id} })
    }
    return res.status(201).json({ msg: "Expense Saved!", expense });        
  } catch (error) {
    console.log(error);
    return res.status(500).json({msg: "Internal server error!"})
  }
}

exports.getExpense = async (req, res, next) => {
  const {id} = req.params;
  try {
    const expense = await Expense.findById(id).populate('createdBy', 'name').populate({ path: 'splitBy.user', model: 'User', select: 'name.full picture' }).exec();
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