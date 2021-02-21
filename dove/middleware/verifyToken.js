const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {  
      req.decoded = jwt.verify(req.headers.authentication, process.env.JWT_SECRET);
      return next();
  } catch(err) {
      console.error(err);
      if(err.name === "TokenExpiredError") {
          return res.status(419).json({
              code: 419,
              message: "토큰이 만료되었습니다",
          });
      }
      return res.status(403).json({
          code: 403,
          message: "유효하지 않은 토큰입니다",
      });
  }
};