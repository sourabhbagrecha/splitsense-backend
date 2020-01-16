const Friend = require("../models/friend");
const User = require("../models/user");
exports.addFriend = async (req, res, next) => {
  try {
    const { requesterId, accepterEmail, defaultCurrency } = req.body;
    const requester = await User.findOne({ googleId: requesterId }).select('_id friends');
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
    const {googleId} = req.body;
    const user = await User.findOne({googleId});
    const friendsArray = user.friends.map(f => f.person);
    console.log(friendsArray);
    const friends = await User.find({ '_id': { $in: friendsArray }}).exec();
    console.log(friends);
    return res.status(200).json({msg: "Fetched!", friends});
  } catch (error) {
    next(error);
  }
}