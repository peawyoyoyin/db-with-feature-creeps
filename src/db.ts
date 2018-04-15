import {
  Connection,
  createConnection,
  ConnectionOptions,
  Repository
} from 'typeorm'
import { Student } from '~/entity/student'
import { Course } from '~/entity/course'
import { Faculty } from '~/entity/faculty'
import { Department } from '~/entity/department'
import { SeniorProject } from '~/entity/senior-project'
import { CourseInstance } from '~/entity/course-instance'

export default class DB {
  static _connection: Connection
  static student: Repository<Student>
  static course: Repository<Course>
  static faculty: Repository<Faculty>
  static departments: Repository<Department>
  static seniorProject: Repository<SeniorProject>
  static courseInstance: Repository<CourseInstance>

  static async init(config: ConnectionOptions) {
    DB._connection = await createConnection(config)
    DB.student = DB._connection.getRepository(Student)
    DB.course = DB._connection.getRepository(Course)
    DB.faculty = DB._connection.getRepository(Faculty)
    DB.departments = DB._connection.getRepository(Department)
    DB.seniorProject = DB._connection.getRepository(SeniorProject)
    DB.courseInstance = DB._connection.getRepository(CourseInstance)
  }

  static async seed() {
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
      citizenID: '9876543210123',
      nationality: 'TH'
    })
    std1.department = dp1
    await DB.student.save(std1)
  }
}
