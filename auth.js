const db = require('./db/models')

const loginUser = (req, res, user) => {
  req.session.auth = {
    userId: user.id
  }
  // console.log("user was logged in", req.session.auth);
}

const logOut = (req, res) => {
  // console.log("THIS IS THE HELP SESSION", req.session.auth)
  delete req.session.auth
}

const requireAuth = (req, res, next) => {
  if (!res.locals.authenticated) {
    return res.redirect('/login')
  }
  return next();
}

const restoreUser = async (req, res, next) => {
  // Log the session object to the console
  // to assist with debugging.
  // console.log('helperkey', req.session);

  if (req.session.auth) {
    const { userId } = req.session.auth;

    try {
      const user = await db.User.findByPk(userId);

      if (user) {
        res.locals.authenticated = true;
        res.locals.user = user;
        next();
      }
    } catch (err) {
      res.locals.authenticated = false;
      next(err);
    }
  } else {
    res.locals.authenticated = false;
    next();
  }
};


module.exports = { loginUser, logOut, restoreUser, requireAuth }
