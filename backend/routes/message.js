const express = require('express');
const router = express.Router();
const Pusher = require('pusher');
// const checkAuth = require("../middleware/check-auth");

const pusher = new Pusher(
  {
  appId: process.env.appId,
  key: process.env.key,
  secret: process.env.secret,
  cluster: 'us2'
});

let messages = [];

router.get('/', (req, res) => {
  res.send('all good');
});

router.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  const auth = pusher.authenticate(socketId, channel);
  res.send(auth);
  console.log(err);
});

// pusher.trigger('private-all-messages', 'client-new-message', {
//   "message": messages
// });

module.exports = router;

