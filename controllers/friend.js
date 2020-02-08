const Activity = require("../models/activity");
const Friend = require("../models/friend");
const User = require("../models/user");
const Expense = require("../models/expense");
const Payment = require("../models/payment")

exports.addFriend = async (req, res, next) => {
  try {
    const { accepterEmail, defaultCurrency } = req.body;
    const requester = await User.findById(req.userId).select('friends');
    const accepter = await User.findOne({ email: accepterEmail }).select('friends');
    if(requester._id.toString() === accepter._id.toString()){
      return res.status(403).json({msg: "You can not add yourself as a friend!"});
    }
    if(!accepter){
      return res.status(403).json({msg: "User with this email address does not exists!"});
    }
    const friend = await Friend.create({ 
      requester: requester._id,
      accepter: accepter._id,
      defaultCurrency,
      activities: [],
      balance: 0,
    });
    accepter.friends.push({ person: requester._id, friendship: friend._id});
    requester.friends.push({ person: accepter._id, friendship: friend._id});
    const finalAccepter = await accepter.save();
    const finalRequester = await requester.save();
    return res.status(200).json({msg: "Friend added!", friend});
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: "Internal server error"});
  }
}

exports.getFriends = async (req, res, next) => {
  try {
    const {userId} = req;
    const user = await User.findById(userId).lean();
    const friendsArray = user.friends.map(f => f.friendship);
    const friendsResponse = await Friend.find({ '_id': { $in: friendsArray }}).populate('requester', 'name email picture').populate('accepter', 'name email picture').exec();
    const friends = friendsResponse.map(f => {
      let friend = {_id: f._id};
      if(f.requester._id.toString() === userId.toString()){ // Everything is working fine now, because the userId type and requesterId were not of the same type they caused heavy tension in the begining, Initially I put the equal-to sign but it wasn't working as expected, but when I used not-equal-to, surprisingly it worked.
        friend.name = f.accepter.name;
        friend.picture = f.accepter.picture;
      } else if(f.accepter._id.toString() === userId.toString()){
        friend.name = f.requester.name;
        friend.pictue = f.requester.picture;
      } else {
        console.log("Hey!!I passed through somehow")
      }
      return friend;
    });
    return res.status(200).json({msg: "Fetched!", friends});
  } catch (error) {
    next(error);
  }
}

exports.getFriend = async (req, res, next) => {
  try {
    const {id} = req.params;
    const {userId} = req;
    const friend = await Friend.findById(id).select('requester accepter activities balances transfer defaultCurrency');
    const userIsRequester = friend.requester.toString() === userId;
    const friendPerson = await User.findById(userIsRequester ? friend.accepter : friend.requester).select('email name picture');
    const activities = await Activity.find({ '_id': {$in : friend.activities} });
    return res.status(200).json({friendPerson, friend, activities, msg: "Friend Found!"});
  } catch (error) {
    next(error);
  }
}

exports.getFriendsForGroup = async (req, res, next) => {
  try {
    const {userId} = req;
    const user = await User.findById(userId).select('friends');
    const userFriends = user.friends.map(f => f.person);
    const friends = await User.find({ '_id': { $in: userFriends } }).select('name picture');
    return res.status(200).json({friends, msg: "Friends found!"});
  } catch (error) {
    next(error);
  }
}


exports.getAddExpenseFriendParticipants = async (req, res, next) => {
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

exports.calculateTotals = async (friendId) => {
  try {
    const friend = await Friend.findById(friendId).select('activities').populate('activities requester accepter', '_id').lean();
    const members = [friend.requester._id, friend.accepter._id];
    const balances = members.map(m => ({balance: 0, user: m}));
    const expenseActivities = (await Activity.find({ "_id": { $in: friend.activities}, "actType": "expense", "operation": "create"}).select('refId').lean()).map((v, i) => (v.refId));
    const expenses = await Expense.find({ "_id": expenseActivities}).select('splitBy paidBy').lean();
    
    const paymentActivities = (await Activity.find({ "_id": { $in: friend.activities}, "actType": "payment", "operation": "create"}).select('refId').lean()).map((v, i) => (v.refId));
    const payments = await Payment.find({ "_id": paymentActivities}).select('from to amount').lean();
    expenses.forEach((expense) => {
      balances.forEach(member => {
        expense.splitBy.filter(s => s.amount > 0).forEach((split) => {
          if(split.user.toString() === member.user.toString()){
            member.balance -= parseFloat(split.amount);
          }
        })
        expense.paidBy.filter(p => p.amount > 0).forEach((paid) => {
          if(paid.user.toString() === member.user.toString()){
            member.balance += parseFloat(paid.amount);
          }
        })
      })
    });
    payments.forEach((payment, i) => {
      balances.forEach(member => {
        if(payment.from.toString() === member.user.toString()){
          member.balance += parseFloat(payment.amount);
        } else if(payment.to.toString() === member.user.toString()){
          member.balance -= parseFloat(payment.amount);
        }
      })
    });
    let transfer = {};
    if(balances.find(b => b.balance > 0 )){
      const to = balances.find(b => b.balance > 0 ).user;
      const from = balances.find(b => b.balance < 0).user;
      const balance = balances.find(b => b.balance > 0).balance;
      transfer = {to, from, balance};
    }
    const friendUpdated = await Friend.findByIdAndUpdate(friendId, { $set: {balances, transfer}}, {new: true}).select('_id balances');
    return friendUpdated;
  } catch (error) {
    next(error);
  }
}