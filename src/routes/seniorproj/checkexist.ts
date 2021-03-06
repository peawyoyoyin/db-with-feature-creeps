import * as express from 'express'
import db from '~/db'

export const getYear = () => {
  return db._connection.manager.query(`
    SELECT DISTINCT year FROM academic_year
  `)
}

export const yearExists = async year => {
  let result = await db._connection.manager.query(
    `
    SELECT EXISTS(
    SELECT 1 FROM academic_year WHERE year=? LIMIT 1)
    `,
    [year]
  )
  if (Object.values(result[0])[0] === '1') return
  else throw ["You're cheating. There is no year"]
}

export const sidExists = async sid => {
  let check_student = await db._connection.manager.query(
    `
    SELECT * FROM student WHERE studentID=? LIMIT 1
    `,
    [sid]
  )
  if (check_student.length === 0) throw ['There is no student']
  else {
    check_student = check_student[0]
    if (check_student.seniorProjectProjectID !== null) {
      throw ['This student already have a project']
    }
  }

  return
}

export const insertProject = async (topic, year) => {
  if (topic === '') throw ['Please fill in Topic field']
  let insert_project = await db._connection.manager.query(
    `
    INSERT INTO senior_project
    (topic,yearYear) VALUES (?,?);
    `,
    [topic, year]
  )
  return insert_project.insertId
}

export const insertTeacherProject = async (topic, year, tid) => {
  if (topic === '') throw ['Please fill in Topic field']
  let insert_project = await db._connection.manager.query(
    `
    INSERT INTO senior_project
    (topic,yearYear,supervisorTeacherID) VALUES (?,?,?);
    `,
    [topic, year,tid]
  )
  return insert_project.insertId
}

export const updateStudentProject = async (projectID, sid) => {
  let insert_student = await db._connection.manager.query(
    `
    UPDATE student
    SET seniorProjectProjectID=?
    WHERE studentID=?
    `,
    [projectID, sid]
  )
}

export const projectExists = async projectID => {
  let find_project = await db._connection.manager.query(
    `
    SELECT
    supervisorTeacherID FROM senior_project
    WHERE projectID=? LIMIT 1
    `,
    [projectID]
  )
  if (find_project.length === 0) throw ['There is no project']
  return true
}

export const studentRegisted = async sid => {
  let student_regis = await db._connection.manager.query(
    `
    SELECT
    seniorProjectProjectID FROM student
    WHERE studentID=? LIMIT 1
    `,
    [sid]
  )
  if (student_regis[0].seniorProjectProjectID === null) return true
  else throw ['Student already has a project']
}

export const tidExists = async tid => {
  let result = await db._connection.manager.query(
    `
    SELECT EXISTS(
    SELECT 1 FROM teacher WHERE teacherID=? LIMIT 1)
    `,
    [tid]
  )
  if (Object.values(result[0])[0] === '1') return
  else throw ['Teacher not found']
}

export const projectHaveTeacher = async projectID => {
  let result = await db._connection.manager.query(
    `
    SELECT supervisorTeacherID
    FROM senior_project
    WHERE projectID=?
    `,
    [projectID]
  )
  console.log("result",result)
  if (result.length === 0) throw ['Project does not exist']
  if (Object.values(result[0])[0] === null) return
  else throw ['Project already has an supervisor']
}

export const updateTeacherProject = async (projectID, tid) => {
  let result = await db._connection.manager.query(
    `
    UPDATE senior_project
    SET supervisorTeacherID=?
    WHERE projectID=?
    `,
    [tid, projectID]
  )
  return result
}
