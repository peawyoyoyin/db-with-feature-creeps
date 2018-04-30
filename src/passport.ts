import * as passport from 'passport'
import { Strategy } from 'passport-local'
import db from '~/db'

async function getUserById(id) {
  const rawStudent = await db.student.query(
    `
    SELECT * FROM student
    WHERE studentID = ?
    `,
    [id]
  )
  if (rawStudent.length === 1) return rawStudent[0]
  const rawTeacher = await db.teacher.query(
    `
    SELECT * FROM teacher
    WHERE teacherID = ?
    `,
    [id]
  )
  if (rawTeacher.length === 1) return rawTeacher[0]
  throw new Error('Incorrect ID')
}

export function initPassport() {
  passport.use(
    new Strategy(
      {
        usernameField: 'id',
        passwordField: 'password',
      },
      (id, password, done) => {
        getUserById(id)
          .then(
            user =>
              user.password === password
                ? done(null, user)
                : done(null, false, { message: 'Incorrect Password' })
          )
          .catch(err => done(null, false, { message: err.message }))
      }
    )
  )
  passport.serializeUser((user, done) => {
    if (user.studentID) done(null, user.studentID)
    else done(null, user.teacherID)
  })
  passport.deserializeUser((id, done) => {
    getUserById(id)
      .then(user => done(null, user))
      .catch(err => done(null, false, { message: err.message }))
  })
}
