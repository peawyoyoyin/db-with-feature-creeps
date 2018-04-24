import { Repository } from 'typeorm'
import DB from './index'

import { Faculty } from '~/entity/faculty'
import { Department } from '~/entity/department'
import { Course } from '~/entity/course'
import { AcademicYear } from '~/entity/academic-year'
import { Semester } from '~/entity/semester'
import { StudentGroup } from '~/entity/student-group'
import { CourseInstance } from '~/entity/course-instance'
import { Teacher } from '~/entity/teacher'
import { Section } from '~/entity/section'
import { SeniorProject } from '~/entity/senior-project'
import { Student } from '~/entity/student'
import { Study } from '~/entity/study.relation'

const seed = async () => {
  async function deleteAll<T>(repository: Repository<T>) {
    await repository
      .createQueryBuilder()
      .delete()
      .execute()
  }

  await deleteAll(DB.faculty)
  const fc1 = new Faculty({
    facultyID: '1234',
    name: 'Engineer'
  })
  const fc2 = new Faculty({
    facultyID: '5678',
    name: 'Accounting'
  })
  await DB.faculty.save(fc1)
  await DB.faculty.save(fc2)

  await deleteAll(DB.departments)
  const dp1 = new Department({
    name: 'Computer Engineering',
    faculty: fc1
  })
  const dp2 = new Department({
    name: 'Electrical Engineering',
    faculty: fc1
  })
  const dp3 = new Department({
    name: 'Civil Engineering',
    faculty: fc1
  })
  await DB.departments.save(dp1)
  await DB.departments.save(dp2)
  await DB.departments.save(dp3)

  await deleteAll(DB.student)
  const std1 = new Student({
    studentID: '6156789021',
    firstName: 'Jame',
    lastName: 'Fast',
    year: 2561,
    citizenID: '9871234560123',
    nationality: 'TH',
    department: dp1
  })
  const std2 = new Student({
    studentID: '5831645895',
    firstName: 'Un',
    lastName: 'Kim-Jong',
    year: 2558,
    citizenID: '9876543210123',
    nationality: 'KR',
    department: dp1
  })
  const std3 = new Student({
    studentID: '5984651325',
    firstName: 'Mark',
    lastName: 'Antony',
    year: 2559,
    citizenID: '9816483210123',
    nationality: 'IT',
    department: dp2
  })
  const std4 = new Student({
    studentID: '6012535648',
    firstName: 'Julius',
    lastName: 'Caesar',
    year: 2560,
    citizenID: '9875846910123',
    nationality: 'IT',
    department: dp2
  })
  const std5 = new Student({
    studentID: '6154489021',
    firstName: 'Dick',
    lastName: 'Johnson',
    year: 2561,
    citizenID: '9876541234563',
    nationality: 'US',
    department: dp2
  })
  await DB.student.save(std1)
  await DB.student.save(std2)
  await DB.student.save(std3)
  await DB.student.save(std4)
  await DB.student.save(std5)

  await deleteAll(DB.course)
  const course1 = new Course({
    courseID: '2110201',
    credit: 3,
    abbreviate: 'COMP ENG MATH',
    name: 'COMPUTER ENGINEERING MATHEMATICS'
  })
  const course2 = new Course({
    courseID: '2110332',
    credit: 3,
    abbreviate: 'SYS ANALYSIS DSGN',
    name: 'SYSTEMS ANALYSIS AND DESIGN'
  })
  const course3 = new Course({
    courseID: '3108406',
    credit: 1,
    abbreviate: 'LAB DOG CAT REPROD',
    name: 'LABORATORY IN DOG AND CAT REPRODUCTION'
  })
  await DB.course.save(course1)
  await DB.course.save(course2)
  await DB.course.save(course3)

  await deleteAll(DB.academicYear)
  const year1 = new AcademicYear({
    year: 2559
  })
  const year2 = new AcademicYear({
    year: 2560
  })
  const year3 = new AcademicYear({
    year: 2561
  })
  await DB.academicYear.save(year1)
  await DB.academicYear.save(year2)
  await DB.academicYear.save(year3)

  await deleteAll(DB.semester)
  const semester1 = new Semester({
    semesterNumber: 1,
    startDate: new Date(2561, 8, 14),
    endDate: new Date(2561, 12, 19),
    year: year3,
    lastSubjectRemovalDate: new Date(),
    lastWithdrawalDate: new Date()
  })
  const semester2 = new Semester({
    semesterNumber: 2,
    startDate: new Date(2562, 1, 7),
    endDate: new Date(2562, 5, 22),
    year: year3,
    lastSubjectRemovalDate: new Date(),
    lastWithdrawalDate: new Date()
  })
  const semester3 = new Semester({
    semesterNumber: 3,
    startDate: new Date(2562, 6, 3),
    endDate: new Date(2562, 8, 9),
    year: year3,
    lastSubjectRemovalDate: new Date(),
    lastWithdrawalDate: new Date()
  })
  const semester4 = new Semester({
    semesterNumber: 1,
    startDate: new Date(2561, 6, 3),
    endDate: new Date(2561, 8, 9),
    year: year2,
    lastSubjectRemovalDate: new Date(),
    lastWithdrawalDate: new Date()
  })
  await DB.semester.save(semester1)
  await DB.semester.save(semester2)
  await DB.semester.save(semester3)
  await DB.semester.save(semester4)
  console.log(">> semesterid1 : " + semester1.id)

  await deleteAll(DB.courseInstance)
  //Course1
  const courseInstance1 = new CourseInstance({
    semester: semester3,
    course: course1,
  })
  const courseInstance2 = new CourseInstance({
    semester: semester2,
    course: course1,
  })
  const courseInstance3 = new CourseInstance({
    semester: semester4,
    course: course1,
  })
  //Course2
  const courseInstance4 = new CourseInstance({
    semester: semester1,
    course: course2,
  })
  const courseInstance5 = new CourseInstance({
    semester: semester2,
    course: course2,
  })
  const courseInstance6 = new CourseInstance({
    semester: semester3,
    course: course2,
  })
  const courseInstance7 = new CourseInstance({
    semester: semester4,
    course: course2,
  })
  //Course3
  const courseInstance8 = new CourseInstance({
    semester: semester3,
    course: course3,
  })
  const courseInstance9 = new CourseInstance({
    semester: semester4,
    course: course3,
  })
  console.log(courseInstance1.semester)
  await DB.courseInstance.save(courseInstance1)
  await DB.courseInstance.save(courseInstance2)
  await DB.courseInstance.save(courseInstance3)
  await DB.courseInstance.save(courseInstance4)
  await DB.courseInstance.save(courseInstance5)
  await DB.courseInstance.save(courseInstance6)
  await DB.courseInstance.save(courseInstance7)
  await DB.courseInstance.save(courseInstance8)
  await DB.courseInstance.save(courseInstance9)


  await deleteAll(DB.studentGroup)
  const studentGroup1 = new StudentGroup({
    groupID: 1
  })
  const studentGroup2 = new StudentGroup({
    groupID: 2
  })
  const studentGroup3 = new StudentGroup({
    groupID: 3
  })
  await DB.studentGroup.save(studentGroup1)
  await DB.studentGroup.save(studentGroup2)
  await DB.studentGroup.save(studentGroup3)

  await deleteAll(DB.teacher)
  const teacher1 = new Teacher({
    teacherID: '1234567890',
    firstName: 'PRABHAS',
    lastName: 'CHONGSTITVATANA',
    abbrName: 'PCS',
    citizenID: '1234567890123'
  })
  const teacher2 = new Teacher({
    teacherID: '0000000000',
    firstName: 'ATTAWITH',
    lastName: 'SUDSANG',
    abbrName: 'ATS',
    citizenID: '0000000000000'
  })
  const teacher3 = new Teacher({
    teacherID: '1111111111',
    firstName: 'JOHN',
    lastName: 'CENA',
    abbrName: 'JCN',
    citizenID: '1111111111111'
  })
  await DB.teacher.save(teacher1)
  await DB.teacher.save(teacher2)
  await DB.teacher.save(teacher3)

  await deleteAll(DB.section)
  const section1 = new Section({
    id: 1,
    capacity: 40,
    sectionNumber: 1,
    courseInstance: courseInstance1,
    time: 'MO 9:00-12:00',
  })
  section1.teacher = teacher1
  const section2 = new Section({
    id: 2,
    capacity: 30,
    sectionNumber: 2,
    courseInstance: courseInstance1,
    time: 'TU 13:00-16:00'
  })
  section2.teacher = teacher2
  const section3 = new Section({
    id: 3,
    capacity: 40,
    sectionNumber: 33,
    courseInstance: courseInstance1,
    time: 'WE 13:00-16:00'
  })
  section3.teacher = teacher1
  const section4 = new Section({
    id: 4,
    capacity: 40,
    sectionNumber: 1,
    courseInstance: courseInstance6,
    time: 'TH 13:00-16:00'
  })
  section4.teacher = teacher1
  const section5 = new Section({
    id: 5,
    capacity: 50,
    sectionNumber: 2,
    courseInstance: courseInstance6,
    time: 'FR 09:00-12:00'
  })
  section5.teacher = teacher2
  await DB.section.save(section1)
  await DB.section.save(section2)
  await DB.section.save(section3)
  await DB.section.save(section4)
  await DB.section.save(section5)

  await deleteAll(DB.seniorProject)
  const seniorProject1 = new SeniorProject({
    topic: "Computer",
    year: 2560
  })
  const seniorProject2 = new SeniorProject({
    topic: "Electronic",
    year: 2561
  })
  const seniorProject3 = new SeniorProject({
    topic: "Electronic",
    year: 2561
  })
  await DB.seniorProject.save(seniorProject1)
  await DB.seniorProject.save(seniorProject2)
  await DB.seniorProject.save(seniorProject3)
  
  await deleteAll(DB.study)
  const study1 = new Study({
    sectionSection: section1, 
    gradeLetter: 'A', 
    student: std1,
    section: courseInstance1
  })
  const study3 = new Study({
    sectionSection: section4, 
    gradeLetter: 'W', 
    student: std1,
    section: courseInstance6
  })
  const study5 = new Study({
    sectionSection: section2, 
    gradeLetter: 'C+', 
    student: std5,
    section: courseInstance1
  })
  await DB.study.save(study1)
  await DB.study.save(study3)
  await DB.study.save(study5)
}
export default seed
