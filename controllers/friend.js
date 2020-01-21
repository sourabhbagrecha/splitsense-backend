const Friend = require("../models/friend");
const User = require("../models/user");

exports.addFriend = async (req, res, next) => {
  try {
    const { accepterEmail, defaultCurrency } = req.body;
    const requester = await User.findOne({ _id: req.userId }).select('_id friends');
    const accepter = await User.findOne({ email: accepterEmail }).select('_id friends');
    console.log("Requester Accept", requester, accepter)
    if(requester && accepter){
      const friend = await Friend.create({ 
        requester: requester._id,
        accepter: accepter._id,
        defaultCurrency,
        first: requester._id,
        second: accepter._id,
        activities: [],
        balance: 0,
      })
      accepter.friends.push({ person: requester._id, friendship: friend._id})
      requester.friends.push({ person: accepter._id, friendship: friend._id})
      const finalAccepter = await accepter.save()
      const finalRequester = await requester.save()
      console.log("FINAL::::::>>>", finalAccepter, finalRequester)
      return res.status(200).json({msg: "Friend added!", friend});
    } else {

    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: "Internal server error"});
  }
}

exports.getFriends = async (req, res, next) => {
  try {
    const {userId} = req;
    const user = await User.findById(userId);
    const friendsArray = user.friends.map(f => f.friendship);
    const friendsResponse = await Friend.find({ '_id': { $in: friendsArray }}).populate('requester', 'name email picture').populate('accepter', 'name email picture').exec();
    const friends = friendsResponse.map(f => {
      let friend = {_id: f._id};
      if(f.requester._id.toString() !== userId){ // Initially I put the equal-to sign but it wasn't working as expected, but when I used not-equal-to, surprisingly it worked.
        friend.name = f.accepter.name;
        friend.picture = f.accepter.picture;
      } else {
        friend.name = f.requester.name;
        friend.pictue = f.requester.picture;
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
    return res.status(200).json({friendPerson, friend, msg: "Friend Found!"});
  } catch (error) {
    next(error);
  }
}