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
import { GroupYearRelation } from '~/entity/group-year.relation'

const seed = async () => {
  async function deleteAll<T>(repository: Repository<T>) {
    await repository
      .createQueryBuilder()
      .delete()
      .execute()
  }

  await deleteAll(DB.faculty)
  const faculty = [
    new Faculty({
      facultyID: '1234',
      name: 'Engineer'
    }),
    new Faculty({
      facultyID: '5678',
      name: 'Accounting'
    })
  ]
  await DB.faculty.save(faculty)

  await deleteAll(DB.departments)
  const department = [
    new Department({
      name: 'Computer Engineering',
      faculty: faculty[0]
    }),
    new Department({
      name: 'Electrical Engineering',
      faculty: faculty[0]
    }),
    new Department({
      name: 'Civil Engineering',
      faculty: faculty[0]
    })
  ]
  await DB.departments.save(department)

  await deleteAll(DB.student)
  const student = [
    new Student({
      studentID: '6156789021',
      firstName: 'Jame',
      lastName: 'Fast',
      year: 2561,
      citizenID: '9871234560123',
      nationality: 'TH',
      department: department[0]
    }),
    new Student({
      studentID: '5831645895',
      firstName: 'Un',
      lastName: 'Kim-Jong',
      year: 2558,
      citizenID: '9876543210123',
      nationality: 'KR',
      department: department[0]
    }),
    new Student({
      studentID: '5984651325',
      firstName: 'Mark',
      lastName: 'Antony',
      year: 2559,
      citizenID: '9816483210123',
      nationality: 'IT',
      department: department[1]
    }),
    new Student({
      studentID: '6012535648',
      firstName: 'Julius',
      lastName: 'Caesar',
      year: 2560,
      citizenID: '9875846910123',
      nationality: 'IT',
      department: department[1]
    }),
    new Student({
      studentID: '6154489021',
      firstName: 'Dick',
      lastName: 'Johnson',
      year: 2561,
      citizenID: '9876541234563',
      nationality: 'US',
      department: department[1]
    })
  ]
  await DB.student.save(student)

  await deleteAll(DB.course)
  const course = [
    new Course({
      courseID: '2110201',
      credit: 3,
      abbreviate: 'COMP ENG MATH',
      name: 'COMPUTER ENGINEERING MATHEMATICS'
    }),
    new Course({
      courseID: '2110332',
      credit: 3,
      abbreviate: 'SYS ANALYSIS DSGN',
      name: 'SYSTEMS ANALYSIS AND DESIGN'
    }),
    new Course({
      courseID: '3108406',
      credit: 1,
      abbreviate: 'LAB DOG CAT REPROD',
      name: 'LABORATORY IN DOG AND CAT REPRODUCTION'
    })
  ]
  await DB.course.save(course)

  await deleteAll(DB.academicYear)
  const academicYear = [
    new AcademicYear({
      year: 2559
    }),
    new AcademicYear({
      year: 2560
    }),
    new AcademicYear({
      year: 2561
    })
  ]
  await DB.academicYear.save(academicYear)

  await deleteAll(DB.semester)
  const semester = [
    new Semester({
      semesterNumber: 1,
      startDate: new Date(2561, 8, 14),
      endDate: new Date(2561, 12, 19),
      year: academicYear[2],
      lastSubjectRemovalDate: new Date(),
      lastWithdrawalDate: new Date()
    }),
    new Semester({
      semesterNumber: 2,
      startDate: new Date(2562, 1, 7),
      endDate: new Date(2562, 5, 22),
      year: academicYear[2],
      lastSubjectRemovalDate: new Date(),
      lastWithdrawalDate: new Date()
    }),
    new Semester({
      semesterNumber: 3,
      startDate: new Date(2562, 6, 3),
      endDate: new Date(2562, 8, 9),
      year: academicYear[2],
      lastSubjectRemovalDate: new Date(),
      lastWithdrawalDate: new Date()
    }),
    new Semester({
      semesterNumber: 1,
      startDate: new Date(2561, 6, 3),
      endDate: new Date(2561, 8, 9),
      year: academicYear[1],
      lastSubjectRemovalDate: new Date(),
      lastWithdrawalDate: new Date()
    })
  ]
  await DB.semester.save(semester)
  console.log(">> semesterid1 : " + semester[0].id)

  await deleteAll(DB.courseInstance)
  const courseInstance = [
    new CourseInstance({
      semester: semester[2],
      course: course[0],
    }),
    new CourseInstance({
      semester: semester[1],
      course: course[0],
    }),
    new CourseInstance({
      semester: semester[3],
      course: course[0],
    }),
    new CourseInstance({
      semester: semester[0],
      course: course[1],
    }),
    new CourseInstance({
      semester: semester[1],
      course: course[1],
    }),
    new CourseInstance({
      semester: semester[2],
      course: course[1],
    }),
    new CourseInstance({
      semester: semester[3],
      course: course[1],
    }),
    new CourseInstance({
      semester: semester[2],
      course: course[2],
    }),
    new CourseInstance({
      semester: semester[3],
      course: course[2],
    }),
  ]
  console.log(courseInstance[0].semester)
  await DB.courseInstance.save(courseInstance)


  await deleteAll(DB.studentGroup)
  const studentGroup = [
    new StudentGroup({
      groupID: 1
    }),
    new StudentGroup({
      groupID: 2
    }),
    new StudentGroup({
      groupID: 3
    }),
  ]
  await DB.studentGroup.save(studentGroup)

  await deleteAll(DB.teacher)
  const teacher = [
    new Teacher({
      teacherID: '1234567890',
      firstName: 'PRABHAS',
      lastName: 'CHONGSTITVATANA',
      abbrName: 'PCS',
      citizenID: '1234567890123'
    }),
    new Teacher({
      teacherID: '0000000000',
      firstName: 'ATTAWITH',
      lastName: 'SUDSANG',
      abbrName: 'ATS',
      citizenID: '0000000000000'
    }),
    new Teacher({
      teacherID: '1111111111',
      firstName: 'JOHN',
      lastName: 'CENA',
      abbrName: 'JCN',
      citizenID: '1111111111111'
    })
  ]
  await DB.teacher.save(teacher)

  await deleteAll(DB.section)
  const section = [
    new Section({
      id: 1,
      capacity: 40,
      sectionNumber: 1,
      courseInstance: courseInstance[0],
      time: 'MO 9:00-12:00',
      teacher: teacher[0],
    }),
    new Section({
      id: 2,
      capacity: 30,
      sectionNumber: 2,
      courseInstance: courseInstance[0],
      time: 'TU 13:00-16:00',
      teacher: teacher[1],
    }),
    new Section({
      id: 3,
      capacity: 40,
      sectionNumber: 33,
      courseInstance: courseInstance[0],
      time: 'WE 13:00-16:00',
      teacher: teacher[0],
    }),
    new Section({
      id: 4,
      capacity: 40,
      sectionNumber: 1,
      courseInstance: courseInstance[5],
      time: 'TH 13:00-16:00',
      teacher: teacher[0]
    }),
    new Section({
      id: 5,
      capacity: 50,
      sectionNumber: 2,
      courseInstance: courseInstance[5],
      time: 'FR 09:00-12:00',
      teacher: teacher[1],
    }),
  ]
  await DB.section.save(section)

  await deleteAll(DB.seniorProject)
  const seniorProject = [
    new SeniorProject({
      topic: "Computer",
      year: 2560
    }),
    new SeniorProject({
      topic: "Electronic",
      year: 2561
    }),
    new SeniorProject({
      topic: "Hardware",
      year: 2561
    }),
  ]
  await DB.seniorProject.save(seniorProject)

  await deleteAll(DB.study)
  const study = [
    new Study({
      sectionSection: section[0], 
      gradeLetter: 'A', 
      student: student[0],
      section: courseInstance[0]
    }),
    new Study({
      sectionSection: section[3], 
      gradeLetter: 'W', 
      student: student[0],
      section: courseInstance[5]
    }),
    new Study({
      sectionSection: section[1], 
      gradeLetter: 'C+', 
      student: student[5],
      section: courseInstance[0]
    })
  ]
  await DB.study.save(study)

const gyr = [
  new GroupYearRelation({
    studentGroup: studentGroup[0],
    fee: 200,
    relationID: 1,
    summerFee: 300,
    year: academicYear[0]
  })
]
await DB.groupYearRelation.save(gyr)
}
export default seed
