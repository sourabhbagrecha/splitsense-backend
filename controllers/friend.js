const Activity = require("../models/activity");
const Friend = require("../models/friend");
const User = require("../models/user");

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
    const friend = await Friend.findById(id);
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