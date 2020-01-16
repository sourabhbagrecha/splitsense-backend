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