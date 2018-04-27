import * as passport from 'passport'
import { Strategy } from 'passport-local'
import db from '~/db'

async function getUser(id, password) {
  const rawStudent = await db.student.query(
    `
    SELECT * FROM student
    WHERE studentID = ? AND password = ?
  `,
    [id, password]
  )
  if (rawStudent.length === 1) return rawStudent[0]
  const rawTeacher = await db.teacher.query(
    `
    SELECT * FROM teacher
    WHERE teacherID = ? AND password = ?
    `,
    [id, password]
  )
  if (rawTeacher.length === 1) return rawTeacher[0]
  throw new Error('Incorrect ID or password')
}

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
  throw new Error('Cannot find user')
}

export function initPassport() {
  passport.use(
    new Strategy(
      {
        usernameField: 'id',
        passwordField: 'password'
      },
      (id, password, done) => {
        getUser(id, password)
          .then(user => done(null, user))
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
