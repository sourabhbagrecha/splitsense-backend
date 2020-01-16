const Group = require('../models/group');
const Friend = require('../models/friend');
const Person = require('../models/person');

exports.getHome = async (req, res, next) => {
  try {
    return res.status(200).json({message: 'Home page returned'});
  } catch (error) {
    next(error);
  }
}

exports.createGroup = async (req, res, next) => {
  try {
    return res.status(200).json({message: 'Create a new Group!'});
  } catch (error) {
    next(error);
  }
}

exports.getGroup = async (req, res, next) => {
  try {
    return res.status(200).json({message: `Group with id:${req.params.id} returned!`});
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

exports.getFriend = async (req, res, next) => {
  try {
    return res.status(200).json({message: `Friend with id: ${req.params.id}`});
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

