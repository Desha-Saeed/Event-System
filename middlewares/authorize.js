const jwt = require('jsonwebtoken');

const authorizeAdmin = (req, res, next) => {
  // Check if the user is authenticated as an admin
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.headers.authorization;
  const payload = jwt.verify(token, process.env.TOKEN_KEY);
  if (payload.role !== 'admin') {
    res.status(401).json({ message: 'Unauthorized' });
    return;
  } else {
    next();
  }
};

const userOrAdmin = (user) => {
  return async (req, res, next) => {
    // Check if the user is authenticated as an admin or the speaker itself
    const token =
      req.body.token ||
      req.query.token ||
      req.headers['x-access-token'] ||
      req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
    const userData = await user.findById(req.params.id);
    if (
      decodedToken.role !== 'admin' &&
      decodedToken.id !== userData._id.toString()
    ) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    } else {
      next();
    }
  };
};
module.exports = { authorizeAdmin, userOrAdmin };
