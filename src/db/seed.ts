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

  // await deleteAll(DB.student)
  // const std1 = new Student({
  //   studentID: '6156789021',
  //   firstName: 'Jame',
  //   lastName: 'Fast',
  //   year: 2561,
  //   citizenID: '9876543210123',
  //   nationality: 'TH'
  // })
  // std1.department = dp1
  // await DB.student.save(std1)

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
    semesterNumber:1,
    startDate: new Date(2561,6,3),
    endDate: new Date(2561,8,9),
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
  const courseInstance1 = new CourseInstance({
    semester:semester1,
    course: course1,
  })
  const courseInstance2 = new CourseInstance({
    semester:semester2,
    course: course1,
  })
  const courseInstance3 = new CourseInstance({
    semester:semester4,
    course: course1,
  })
  console.log(courseInstance1.semester)
  await DB.courseInstance.save(courseInstance1)
  await DB.courseInstance.save(courseInstance2)
  await DB.courseInstance.save(courseInstance3)
  
  
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
    abbrName: 'ASS',
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
}
