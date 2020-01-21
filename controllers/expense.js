const Activity = require('../models/activity');
const Expense = require('../models/expense');
const Friend = require('../models/friend');

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
    const activity = await Activity.create({actType: "Expense", operation: "Create", refId: expense._id})
    if(friendId) {
      const friend = await Friend.findByIdAndUpdate(friendId, {$push: { "activities": activity._id} })
      console.log("+++++++++============>>>>>>");
      console.log(await Friend.findById(friendId));
      console.log('++++++++++++++++===========')
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
    const expense = await Expense.findById(id).populate('createdBy', 'name');
    return res.status(200).json({msg: "Expense Found", expense})
  } catch (error) {
    console.log(error);
  }
}