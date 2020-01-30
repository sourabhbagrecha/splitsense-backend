const User = require("../models/user");

exports.addUser = async (req, res, next) => {
  try {
    const { name, given_name, family_name, email, id, picture } = req.body.profile;
    const user = await User.create({
      googleId: id,
      name: {
        full: name,
        first: given_name,
        last: family_name,
      },
      email,
      picture,
      defaultCurrency: 'INR'
    });
    console.log('Saved User in MongoDB:',user);
    res.status(201).json({user, msg: "User saved in DB"})
  } catch (error) {
    next(error);
  }
};

exports.getMetaFromArray = async (req, res, next) => {
  try {
    const { users } = req.body;
    const usersMeta = await User.find({ '_id': { $in: users }}).select('name.full picture').lean();
    return res.status(200).json({usersMeta, msg: "Users meta returned!"});
  } catch (error) {
    next(error);
  }
}

exports.getMeta = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).select('name.full picture').lean();
    console.log(user)
    return res.status(200).json({user, msg: "Users meta returned!"});
  } catch (error) {
    next(error);
  }
}