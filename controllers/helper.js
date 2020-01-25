const Friend = require("../models/friend");
const User = require("../models/user");

exports.checkFriendship = async (req, res, next) => {
  try {
    const { requesterId, accepterEmail } = req.body;
    const requester = await User.findOne({ googleId: requesterId }).select('_id friends');
    const accepter = await User.findOne({ email: accepterEmail }).select('_id friends');
    const areFriends = false;
    if(!accepter) return res.status(404).json({msg: "User with that email id does not exist"});
    requester.friends.forEach(friend => {
      if(accepter._id === friend.person){
        areFriends = true;
      }
    });
    return res.status(200).json({areFriends})
  } catch (error) {
    console.log(error)
    return res.status(500).json({msg: "Internal server error"});
  }
}

exports.checkUserExistenceWithEmail = async (req, res, next) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({ email: email }).select('_id');
    console.log(user);
    if(user) return res.status(200).json({msg: "User found", userId: user._id});
    else return res.status(204).json({msg: "User does not exist"});
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Internal server error"});
  }
}

exports.findUserByGoogleId = async (req, res, next) => {
  try {
    const {googleId} = req.body;
    const user = await User.findOne({ googleId }).select('_id');
    console.log(user);
    if(user) return res.status(200).json({msg: "User found", id: user._id});
    else return res.status(204).json({msg: "User does not exist"});
  } catch (error) {
    console.log(error);
    res.status(500).json({msg: "Internal server error"});
  }
}

exports.sendAnInvite = async (req, res, next) => {
  try {
    const {email} = req.body;
    console.log("Sending an invite by email to ",email);
    return res.status(200).json({msg: `Invitation sent to ${email}`});
  } catch (error) {
    console.log(error);
    next(error);
  }
}

exports.checkAuth = async (req, res, next) => {
  try {
    console.log(req.userId, req.emailId);
    const reqHeaders = req.get('Authorization');
    res.status(200).json({reqHeaders, userId: req.userId});
  } catch (error) {
    next(error);
  }
}
