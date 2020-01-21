const User = require('../models/user');
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = process.env.GOOG_CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

module.exports = async (req, res, next) => {
  try {
    console.log(req.url)
    const authHeader = req.get('Authorization');
    const {idToken} = JSON.parse(authHeader);
    console.log("authHeader:::::::>>>>>>>", idToken)
    const ticket = await client.verifyIdToken({
        idToken,
        audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const emailId = payload['email'];
    const googleId = payload['sub'];
    const user = await User.findOne({email: emailId}).select('_id');
    req.userId = user._id;
    req.emailId = emailId;
    next();
  } catch (error) {
    next(error);
  }
}