const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRETKEY;

const adminAuthMiddleware = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      console.log('Token not found in request');
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
  
      if (decoded.isAdmin) {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
};
  
  const userAuthMiddleware = (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, secretKey);
  
      if (!decoded.isAdmin) {
        next();
      } else {
        return res.status(403).json({ message: 'Access denied' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
};
module.exports = {adminAuthMiddleware, userAuthMiddleware}
