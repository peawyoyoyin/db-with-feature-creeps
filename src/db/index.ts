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
import { Section } from '~/entity/section'
import { AcademicYear } from '~/entity/academic-year'
import { Semester } from '~/entity/semester'
import { Teacher } from '~/entity/teacher'
import { StudentGroup } from '~/entity/student-group'
import { Study } from '~/entity/study.relation'

export default class DB {
  static _connection: Connection
  static student: Repository<Student>
  static course: Repository<Course>
  static faculty: Repository<Faculty>
  static departments: Repository<Department>
  static seniorProject: Repository<SeniorProject>
  static courseInstance: Repository<CourseInstance>
  static academicYear: Repository<AcademicYear>
  static semester: Repository<Semester>
  static teacher: Repository<Teacher>
  static studentGroup: Repository<StudentGroup>
  static study: Repository<Study>
  static section: Repository<Section>

  static async init(config: ConnectionOptions) {
    DB._connection = await createConnection(config)
    DB.student = DB._connection.getRepository(Student)
    DB.course = DB._connection.getRepository(Course)
    DB.faculty = DB._connection.getRepository(Faculty)
    DB.departments = DB._connection.getRepository(Department)
    DB.seniorProject = DB._connection.getRepository(SeniorProject)
    DB.courseInstance = DB._connection.getRepository(CourseInstance)
    DB.academicYear = DB._connection.getRepository(AcademicYear)
    DB.semester = DB._connection.getRepository(Semester)
    DB.teacher = DB._connection.getRepository(Teacher)
    DB.studentGroup = DB._connection.getRepository(StudentGroup)
    DB.study = DB._connection.getRepository(Study)
    DB.section = DB._connection.getRepository(Section)
  }
}
