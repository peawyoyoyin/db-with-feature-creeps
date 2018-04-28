import * as express from 'express'
import db from '~/db'

export const getYear = () => {
  return db._connection.manager.query(
    `SELECT DISTINCT year FROM academic_year`
  )
}

export const yearExists = async (year) => {
  let result = await db._connection.manager.query(
    `SELECT EXISTS(
    SELECT 1 FROM academic_year WHERE year=? LIMIT 1)`,
    [year]
  )

  if(Object.values(result[0])[0] === '0') return 
  else return "You're cheating. There is no year"
}

export const sidExists = async (sid) => {
  let check_student = await db._connection.manager.query(
    `
    SELECT * FROM student WHERE studentID=? LIMIT 1`,
    [sid]
  )
  if (check_student.length === 0) return 'There is no student'
  else {
    check_student = check_student[0]
    if (check_student.seniorProjectProjectID !== null) {
      return 'This student already have a project'
    }
  }

  return
}

export const insertProject = async (topic,year) => {
  if (topic === '') throw ['Please fill in Topic field']
    let insert_project = await db._connection.manager.query(
      `INSERT INTO senior_project
      (topic,year) VALUES (?,?);
      `,
      [topic, year]
    )
    let query_id = await db._connection.query(`SELECT LAST_INSERT_ID();`)
    return Object.values(query_id[0])[0]
}

export const updateStudentProject = async (projectID,sid) => {
  let insert_student = await db._connection.manager.query(
    `UPDATE student
  SET seniorProjectProjectID=?
  WHERE studentID=?
  `,
    [projectID, sid]
  )
}

export const projectExists = async (projectID) => {
  let find_project = await db._connection.manager.query(
    `SELECT 
    supervisorTeacherID FROM senior_project 
    WHERE projectID=? LIMIT 1`,
    [projectID]
  )
  if (find_project.length === 0) throw ['There is no project']
  return true
}