const Activity = require("../models/activity");

exports.getAllActivities = async (req, res, next) => {
  try {
    const {userId} = req;
    const activities = await Activity.find({ concerned: { $in: [userId]} });
    return res.status(200).json({activities});
  } catch (error) {
    next(error);
  }
}