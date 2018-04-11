import { Connection, createConnection, ConnectionOptions, Repository } from 'typeorm'
import { Student } from '~/entity/student'
import { Course } from '~/entity/course'
import { Faculty } from '~/entity/faculty'
import { Department } from '~/entity/department'
import { SeniorProject } from '~/entity/senior-project'
import { CourseInstance } from '~/entity/course-instance'

export default class DB {
  static _connection : Connection
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
}
