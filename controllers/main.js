const Group = require('../models/group');
const Friend = require('../models/friend');
const Person = require('../models/user');

exports.getHome = async (req, res, next) => {
  try {
    return res.status(200).json({message: 'Home page returned'});
  } catch (error) {
    next(error);
  }
}

exports.addFriend = async (req, res, next) => {
  try {
    return res.status(200).json({message: 'Add new Friend!'});
  } catch (error) {
    next(error);
  }
}