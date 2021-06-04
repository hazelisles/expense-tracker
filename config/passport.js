const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const facebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(new localStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
    User.findOne({ email }).then(user => {
      if (!user) {
        return done(null, false, req.flash('error_msg', '此 Email 尚未註冊！'), req.flash('email', email))
      }
      return bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) {
            return done(null, false, req.flash('error_msg', 'Email 或 密碼錯誤！'), req.flash('email', email))
          }
          return done(null, user)
        })
    }).catch(err => done(err, false))
  }))

  passport.use(new facebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const { name, email } = profile._json
      let user = await User.findOne({ email })
      if (user) return done(null, user)
      const randomPassword = Math.random().toString(36).slice(-8)
      const hash = await bcrypt.hash(randomPassword, 10)
      user = await User.create({
        name, email, password: hash
      })
      return done(null, user)
    } catch (err) {
      done(err, false)
    }
  }))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  })
}