const User = require("../models/user");

exports.addUser = async (req, res, next) => {
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
}