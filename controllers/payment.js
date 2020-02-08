const Activity = require('../models/activity');
const Payment = require('../models/payment');
const Group = require('../models/group');
const Friend = require("../models/friend");

const groupController = require("./group");
const friendController = require("./friend");

exports.addPayment = async (req, res, next) => {
  try {
    const {userId} = req;
    const {amount, from, to, belongsTo, belongsType} = req.body;
    const payment = await Payment.create({
      amount,
      from,
      to,
      belongsTo,
      belongsType,
      createdBy: userId,
    });
    const activity = await Activity.create({
      actType: "payment",
      operation: "create",
      refId: payment._id,
      concerned: [from, to]
    });
    if(belongsType === "group"){
      const groupUpdated = await Group.findByIdAndUpdate(belongsTo, {$push: {activities: activity._id}})
      await groupController.calculateTotals(belongsTo);
    } else if(belongsType === "friend") {
      const friendUpdated = await Friend.findByIdAndUpdate(belongsTo, {$push: {activities: activity._id}})
      await friendController.calculateTotals(belongsTo);
    }
    return res.status(200).json({payment, msg: "Payment recorded successfully!"});
  } catch (error) {
    next(error);
  }
};

exports.getPayment = async (req, res, next) => {
  try {
    const {paymentId} = req.params;
    const payment = await Payment.findById(paymentId).populate('from to createdBy', 'name.full');
    return res.status(200).json({results: payment, msg: 'Payment Found!'});
  } catch (error) {
    next(error);    
  }
}

exports.getPaymentMeta = async (req, res, next) => {
  try {
    const {paymentId} = req.params;
    const payment = await Payment.findById(paymentId).select('from to amount').populate('from to', 'name.full');
    return res.status(200).json({results: payment, msg: 'Payment Found!'});
  } catch (error) {
    next(error);    
  }
}
