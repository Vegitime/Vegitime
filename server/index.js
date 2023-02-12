const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const schedule = require('node-schedule');
const webpush = require('web-push');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// cors 설정
const whitelist = ['http://localhost:3000', 'http://localhost:8081'];
const corsOptions = {
  origin(origin, callback) {
    const issafesitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, issafesitelisted);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// db 연결
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => console.log(err));

// api 라우터 설정
app.use('/api/users', require('./routes/users'));
app.use('/api/vegetables', require('./routes/vegetables'));
app.use('/api/shop', require('./routes/shop'));

const { Vegetable } = require('./models/Vegetable');

schedule.scheduleJob('0 0 * * *', async () => {
  await Vegetable.updateMany({}, { isCompleted: false });
});

webpush.setGCMAPIKey(process.env.GCM_KEY);
webpush.setVapidDetails(
  process.env.SUBJECT,
  process.env.VAPID_PUBLIC,
  process.env.VAPID_PRIVATE
);

app.get('/vapid-public-key', (_req, res) => {
  res.send(process.env.VAPID_PUBLIC);
});

const port = process.env.PORT || 8080;
app.listen(port, function () {
  console.log(`listening on ${port}`);
});
