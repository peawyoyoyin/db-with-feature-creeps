import * as express from 'express'

const router = express.Router()

router.get('/browse', (req, res) => {
  const { projectID, topic, year, superVisorTeacherID } = req.query
  let searchProjectID = projectID
  let searchTopic = topic
  let searchYear = year
  let searchSuperVisorTeacherID = superVisorTeacherID
  res.render('seniorproj/browse', { 
    title: 'Browse Senior Projects',
    searchProjectID: searchProjectID,
    searchTopic: searchTopic,
    searchYear: searchYear,
    years: [2558,2559,2560],
    searchSuperVisorTeacherID: searchSuperVisorTeacherID
  })
})

router.get('/register', (req, res) => {
  res.render('seniorproj/register', { title: 'Register Senior Project' })
})

router.get('/update', (req, res) => {
  res.render('seniorproj/update', { 
    title: 'Update Senior Project Status',
    grades:["A","B+","B","C+","C","D+","D","F"]
  })
})


export default router
