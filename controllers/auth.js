const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.GOOG_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

exports.localLogin = async (req, res, next) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user){
      return res.status(401).json({msg: "User does not exist!"});
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if(!isMatched){
      return res.status(401).json({msg: "Incorrect password"});
    }
    const payload = { userId: user._id.toString(), email};
    const token = jwt.sign(payload, secret, { expiresIn: '24h'});
    return res.status(200).json({msg: "Success!", token})
  } catch (error) {
    next(error);
  }
}

exports.localRegister = async (req, res, next) => {
  try {
    const {email, firstname, lastname, password} = req.body;
    const userEmailCheck = await User.findOne({email}).select('_id').lean();
    if(userEmailCheck){
      return res.status(400).json({msg: "User with that email id already exists!"});
    }
    const hashedPw = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPw,
      name: {
        first: firstname,
        last: lastname,
        full: `${firstname} ${lastname}`
      }
    });
    const payload = { userId: user._id.toString(), email};
    const token = jwt.sign(payload, secret, { expiresIn: '24h'});
    res.status(201).json({msg: "Success!", token});
  } catch (error) {
    next(error);
  }
}

exports.googleAuth = async (req, res, next) => {
  try {
    const {idToken} = req.body;
    const { name, given_name, family_name, picture } = req.body.profile;
    const ticket = await client.verifyIdToken({
      idToken,
      audience: CLIENT_ID
    });
    const googlePayload = ticket.getPayload();
    const email = googlePayload['email'];
    const userExists = await User.findOne({email}).select('_id').lean();
    let user = userExists;
    if(!userExists){
      user = await User.create({
        name: {
          full: name,
          first: given_name,
          last: family_name,
        },
        email,
        picture
      });
    }
    const payload = { userId: user._id.toString(), email};
    const token = jwt.sign(payload, secret, { expiresIn: '24h'});
    return res.status(200).json({ msg: "Success!", token, userId: user._id});
  } catch (error) {
    next(error);
  }
}