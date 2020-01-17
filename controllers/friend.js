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
    const {userId} = req;
    const user = await User.findById(userId);
    console.log("}}}", userId, user)
    const friendsArray = user.friends.map(f => f.person);
    console.log(friendsArray);
    const friends = await User.find({ '_id': { $in: friendsArray }}).exec();
    console.log(friends);
    return res.status(200).json({msg: "Fetched!", friends});
  } catch (error) {
    next(error);
  }
}

exports.getFriend = async (req, res, next) => {
  const {id} = req.params;
  const {userId} = req;
  const participants = [id, userId]
  try {
    const friend = await Friend.findOne({$and: [{requester: {$in: participants} }, {accepter: {$in: participants} }]});
    return res.status(200).json({ friend: friend, msg: "Friend Found!"});
  } catch (error) {
    console.log(error)
    next(error);
  }
}

exports.getGeneralData = async (req, res, next) => {
  const {id} = req.params;
  try {
    const user = await User.findById(id).select('name email picture')
    if(user) res.status(200).json({ friendData: user, msg: "Friend data found!" })
    else res.status(204).json({  msg: "Friend data NOT found!" })
  } catch (error) {
    console.log(error);
    next(error);
  }
}