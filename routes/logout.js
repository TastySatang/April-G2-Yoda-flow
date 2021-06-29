var express = require('express');
const { logOut } = require('../auth');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res) {
  res.render('logout', { title: 'logout-yoda-flow' })
});

router.post('/', (req, res) => {
  logOut(req, res);
  req.session.save(() => res.redirect('/'));
})

module.exports = router;
