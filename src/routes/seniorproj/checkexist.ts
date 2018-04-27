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