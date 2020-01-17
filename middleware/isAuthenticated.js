module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  console.log(authHeader);
  if(!authHeader){
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  req.userId = authHeader; //could be authHeader.userId
  next();
}