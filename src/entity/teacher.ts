import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToMany,
  ManyToOne
} from 'typeorm'
import { Length, Min, IsNumberString } from 'class-validator'
import { validate } from '~/utils'
import { Student } from './student'
import { Section } from './section'
import { Course } from './course'
import { Department } from './department'
import { SeniorProject } from '~/entity/senior-project'
import { Evaluation } from '~/entity/evaluation.relation'

interface TeacherArgs {
  teacherID: string
  password: string
  firstName: string
  lastName: string
  abbrName: string
  citizenID: string
}
@Entity()
export class Teacher {
  constructor(args: TeacherArgs) {
    if (args === undefined) return
    this.teacherID = args.teacherID
    this.password = args.password
    this.firstName = args.firstName
    this.lastName = args.lastName
    this.abbrName = args.abbrName
    this.citizenID = args.citizenID
    validate(this)
  }

  @PrimaryColumn({ type: 'varchar', length: 10 })
  @Length(7, 7, { message: 'teacherID length must be 10 characters' })
  @IsNumberString()
  teacherID: string

  @Column({ type: 'varchar', length: 20 })
  password: string

  @Column({ type: 'varchar', length: 30 })
  @Length(1, 30)
  firstName: string

  @Column({ type: 'varchar', length: 30 })
  @Length(1, 30)
  lastName: string

  @Column({ type: 'varchar', length: 3 })
  @Length(3, 3)
  abbrName: string

  @Column({ type: 'varchar', length: 13, unique: true })
  @Length(13, 13, { message: 'citizenID length must be 13 characters' })
  @IsNumberString()
  citizenID: string

  @OneToMany(type => Student, student => student.supervisor)
  studentsUnderSupervision: Student[]

  @OneToMany(type => SeniorProject, seniorProject => seniorProject.supervisor)
  seniorProjectsUnderSupervision: SeniorProject[]

  @OneToMany(type => Section, section => section.teacher)
  sectionsTeached: Section[]

  @OneToMany(type => Course, course => course.owner)
  coursesOwned: Course[]

  @ManyToOne(type => Department, department => department.teachers, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  department: Department

  @ManyToMany(type => Evaluation, evaluation => evaluation.evaluators)
  projectEvaluations: Evaluation[]
}
