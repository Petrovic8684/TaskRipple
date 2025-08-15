import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      jwt.decode(token, process.env.JWT_SECRET);

      next();
    } catch (error) {
      return res.sendStatus(403);
    }
  }

  if (!token) {
    return res.sendStatus(401);
  }
};

export { verifyToken };
