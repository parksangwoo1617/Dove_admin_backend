const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const session = require('express-session');
const helmet = require('helmet');
const hpp = require('hpp');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const adminRouter = require('./routes/admin');

const { sequelize } = require('./models');
const logger = require('./logger');

const app = express();

app.set('port', process.env.PORT || 8080);

sequelize.sync({ force: false })
  .then(() => console.log('데이터 베이스 연결 성공'))
  .catch(console.error);

  if(process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
} else { //development
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  const allowOrigins = [process.env.ALLOW_ORIGIN_1, process.env.ALLOW_ORIGIN_2];
  const origin = req.headers.origin;
  if(allowOrigins.includes(origin)) {
    return cors({
      origin: origin,
      credentials: true,
    })(req, res, next);
  } else {
    return next(); 
  }
});
const redisClient = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
const redisConnectionResult = redisClient.auth(process.env.REDIS_PASSWORD, err => {
  if(err) console.log(err, '에러가 발생했습니다');
});
console.log("redis 연결 결과", redisConnectionResult);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
const sessionOption = {
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    store: new RedisStore({
      client: redisClient,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      pass: process.env.REDIS_PASSWORD,
      logErrors: true,
    }),
};
if(process.env.NODE_ENV === 'production') {
  sessionOption.proxy = true;
  //sessionOption.cookie.secure = true;
}
app.use(session(sessionOption));

app.use('/user', indexRouter);
app.use('/post', adminRouter);

app.use((req, res, next) => {
  res.status(404).json({ message: "NOT FOUND" });
  logger.info('hello');
  logger.error(err.message);
  next(err);
});

app.listen(app.get('port'), () => {
  console.log("server on", app.get('port'));
})

module.exports = app;