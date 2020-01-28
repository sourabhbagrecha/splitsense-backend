const Activity = require("../models/activity");
const Expense = require("../models/expense");
const Group = require("../models/group");
const User = require("../models/user");

exports.createGroup = async (req, res, next) => {
  try {
    const {userId} = req;
    const {name, groupType, members, currency} = req.body;
    const balances = group.members.map(m => ({balance: 0, user: m}));
    const transfers = [];
    const group = await Group.create({name, groupType, members: [...members, userId], currency, createdBy: userId, balances, transfers});
    const updates = await User.updateMany({ _id: {$in: [...members, userId]}}, {$push: { groups: group._id}});
    return res.status(201).json({groupId: group._id});
  } catch (error) {
    next(error);
  }
}

exports.getGroup = async (req, res, next) => {
  try {
    const {groupId} = req.params;
    const group = await Group.findById(groupId)
      .populate('balances.user', 'name.full picture');
    const activities = await Activity.find({ '_id': { $in: group.activities } });
    return res.status(200).json({group, activities, msg: "Group Found!"});
  } catch (error) {
    next(error);
  }
}

exports.getGroups = async (req, res, next) => {
  try {
    const {userId} = req;
    const user = await User.findById(userId).select('groups');
    const groupsArray = user.groups;
    const groups = await Group.find({ _id: { $in: groupsArray } });
    return res.status(200).json({ groups, msg: "Groups Found!"});
  } catch (error) {
    next(error);
  }
}

exports.getAddExpenseGroupParticipants = async (req, res, next) => {
  const {groupId} = req.params;
  try {
    const group = await Group.findById(groupId);
    const participants = await User.find({"_id": { $in : group.members }}).select('name picture');
    return res.status(200).json({participants, msg: "Participants found!"})
  } catch (error) {
    next(error);
  }
}

// exports.getBalances = async (req, res, next) => {
//   const {groupId} = req.params;
//   try {
//     const group = await Group.findById(groupId).select
//     const participants = await User.find({"_id": { $in : group.members }}).select('name picture');
//     return res.status(200).json({participants, msg: "Participants found!"})
//   } catch (error) {
//     next(error);
//   }
// }

exports.calculateTotals = async (req, res, next) => {
  const {groupId} = req.params;
  try {
    const group = await Group.findById(groupId).select('activities members').populate('activities', '_id').lean();
    const balances = group.members.map(m => ({balance: 0, user: m}));
    const expenseActivities = (await Activity.find({ "_id": { $in: group.activities}, "actType": "expense", "operation": "create"}).select('refId').lean()).map((v, i) => (v.refId));
    const expenses = await Expense.find({ "_id": expenseActivities}).select('splitBy paidBy').lean();
    expenses.forEach((expense, i) => {
      balances.forEach(member => {
        expense.splitBy.filter(s => s.amount > 0).forEach((split, j) => {
          if(split.user.toString() === member.user.toString()){
            member.balance -= split.amount;
          }
        })
        expense.paidBy.filter(p => p.amount > 0).forEach((paid, j) => {
          if(paid.user.toString() === member.user.toString()){
            member.balance += paid.amount;
          }
        })
      })
    });
    //payments remaining!

    const sortDescending = (a, b) => b.balance - a.balance;
    let creditors = balances.filter(m => m.balance > 0).sort(sortDescending);
    let debtors = balances.filter(m => m.balance < 0).map(m => ({...m, balance: -1*(m.balance)})).sort(sortDescending);
    const transfers = [];
    let i = 0;
    console.log({creditors, debtors});
    while(debtors[0].balance > 0 && creditors[0].balance > 0){
      let from, to, balance;
      let debtorBalance = debtors[0].balance;
      let creditorBalance = creditors[0].balance;
      from = debtors[0].user;
      to = creditors[0].user;
      if(creditorBalance > debtorBalance){
        balance = debtorBalance;
      } else if(creditorBalance < debtorBalance){
        balance = creditorBalance;
      } else if(creditorBalance !== 0 && creditorBalance === debtorBalance){
        balance = creditorBalance;
      } else {
        break;
      }
      creditors = creditors.map((c, i) => (i === 0 ? {...c, balance: c.balance - balance} : c))
      debtors = debtors.map((d, i) => (i === 0 ? {...d, balance: d.balance - balance} : d))
      const newTransfer = { to, from, balance };
      transfers.push(newTransfer);
      creditors = creditors.sort(sortDescending);
      debtors = debtors.sort(sortDescending);
    }
    console.log({transfers});
    const groupUpdated = await Group.findByIdAndUpdate(groupId, { $set: {transfers, balances}}, {new: true})
    return res.status(200).json({msg: "Totals calculated!", groupUpdated });
  } catch (error) {
    next(error);
  }
}