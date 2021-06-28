const db = require('./db/models')

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id
  }
}

const logOut = (req, res) => {
  delete req.session.auth
}



module.exports = { loginUser, logOut }
