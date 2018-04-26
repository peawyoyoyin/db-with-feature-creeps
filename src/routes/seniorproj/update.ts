import * as express from 'express'
import db from '~/db'

const router = express.Router()

router.get('/', async (req, res) => {
  const rawTypes = await getAllEvaluationType()
  const types = rawTypes.map(type => ({
    text: type.description,
    value: type.typeID
  }))
  res.render('seniorproj/update', {
    title: 'Update Senior Project Status',
    grades: ['A', 'B+', 'B', 'C+', 'C', 'D+', 'D', 'F'],
    types
  })
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const { teacherID, projectID, type, grade, comment } = req.body
  try {
    // const rawTeacher = await getTeacher(teacherID)
    await createEvaluation(projectID, teacherID, type, comment, grade)
    // console.log(rawTeacher)
    res.redirect('/seniorproj/update')
  } catch (e) {
    console.log(e)
  }
})

async function getAllEvaluationType() {
  const rawTypes = await db.evaluationType.query(`
    SELECT * FROM evaluation_type
  `)
  return rawTypes
}

async function getTeacher(teacherID) {
  const rawTeacher = await db.teacher.query(
    `
    SELECT * FROM teacher
    WHERE teacherID = ?
  `,
    [teacherID]
  )
  if (rawTeacher.length === 0) throw new Error('Cannot find teacher')
  return rawTeacher[0]
}
async function createEvaluation(projectID, teacherID, typeID, comment, grade) {
  // await db.teacher.queryRunner.startTransaction()
  const result = await db.evaluation.query(
    `
    insert into evaluation(comment,grade,projectProjectID,evaluationTypeTypeID)
    value(?, ?, ?, ?)
  `,
    [comment, grade, projectID, typeID]
  )
  const { insertId } = result
  const result2 = await db.evaluation.query(
    `
      insert into evaluation_evaluators_teacher(evaluationId, teacherTeacherID)
      value(?, ?)
    `,
    [insertId, teacherID]
  )
  console.log(result)
}

export default router
