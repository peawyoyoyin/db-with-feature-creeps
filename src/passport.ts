import * as passport from 'passport'
import { Strategy } from 'passport-local'

export function initPassport() {
  passport.use(
    new Strategy(
      {
        usernameField: 'id',
        passwordField: 'password'
      },
      (username, password, done) => {
        if (username === 'tip' && password === 'box')
          return done(null, { name: 'phootip', id: username })
        return done(null, false, { message: 'Incorrect ID or password' })
      }
    )
  )
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    done(null, { name: 'phootip', id: id })
  })
}
