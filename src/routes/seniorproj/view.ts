import * as express from 'express'
import db from '~/db'

const router = express.Router()

async function getProject(queryProjectID) {
  const rawProject = await db.seniorProject.query(
    `
    SELECT projectID, topic, yearYear as year, firstName, lastName FROM senior_project S
    JOIN teacher T ON S.supervisorTeacherID = T.teacherID
    WHERE projectID = ?
    `,
    [queryProjectID]
  )
  if (rawProject.length === 0) return null
  const { projectID , topic, year, firstName, lastName } = rawProject[0]
  return {
    projectID,
    topic,
    year,
    supervisor: `${firstName} ${lastName}`,
  }
}

async function getEvaluations(projectID) {
  const rawEvaluations = await db.evaluation.query(
    `
      SELECT id, comment, grade, firstName, lastName, abbrName, weight, description as type FROM evaluation AS E
      LEFT JOIN teacher AS T ON E.evaluatorTeacherID = T.teacherID
      LEFT JOIN evaluation_type AS TP ON E.evaluationTypeTypeID = TP.typeID
      WHERE projectProjectID = ?
    `,
    [projectID]
  )
  if (rawEvaluations.length === 0) return null
  return rawEvaluations.map(evaluation => {
    const {comment, grade, firstName, lastName, type} = evaluation
    return {
      comment,
      grade,
      type,
      teacherFullName: `${firstName} ${lastName}`,
    }
  })
}

router.get('/', async (req: any, res) => {
  const student = req.user
  const project = student ? await getProject(student.seniorProjectProjectID) : null
  console.log(student)
  const evaluations = project ? await getEvaluations(project.projectID) : null
  const { renderOptions } = req
  res.render('seniorproj/view', {
    student,
    project,
    evaluations,
    ...renderOptions,
  })
})

export default router
