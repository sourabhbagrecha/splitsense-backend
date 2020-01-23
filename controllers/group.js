const Activity = require("../models/activity");
const Group = require("../models/group");
const User = require("../models/user");

exports.createGroup = async (req, res, next) => {
  try {
    const {userId} = req;
    const {name, groupType, members, currency} = req.body;
    const group = await Group.create({name, groupType, members, currency, createdBy: userId});
    const updates = await User.updateMany({ _id: {$in: [...members, userId]}}, {$push: { groups: group._id}});
    return res.status(201).json({groupId: group._id});

  } catch (error) {
    next(error);
  }
}

exports.getGroup = async (req, res, next) => {
  try {
    const {id} = req.params;
    const group = await Group.findById(id);
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