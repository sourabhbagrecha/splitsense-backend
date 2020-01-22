const Group = require("../models/group");
const Activity = require("../models/activity");

exports.createGroup = async (req, res, next) => {
  try {
    const {name, groupType, members, currency} = req.body;
    console.log({name, groupType, members, currency});
    const group = await Group.create({name, groupType, members, currency});
    console.log("Group:::>>>> created:::>>>", group);
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

// exports.getGroups = async (req, res, next) => {
//   try {
//     const {userId} = req;
//     const group = await Group.find()
//   } catch (error) {
    
//   }
// }