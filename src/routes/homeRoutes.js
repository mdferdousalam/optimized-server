const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Server health is good');
});

module.exports = router;