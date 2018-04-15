import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  OneToOne
} from 'typeorm'
import { Length, Min, IsNumberString } from 'class-validator'
import { validate } from '~/utils'
import { StudentGroup } from './student-group'
import { EnrollmentFeePayment } from './enrollment-fee-payment'
import { Teacher } from './teacher'
import { Department } from './department'
import { Section } from './section'
import { Study } from './study'
import { SeniorProject } from './senior-project'

interface StudentArgs {
  studentID: string
  firstName: string
  lastName: string
  year: number
  nationality: string
  citizenID: string
}
@Entity()
export class Student {
  constructor(args: StudentArgs) {
    if (args === undefined) return
    this.studentID = args.studentID
    this.firstName = args.firstName
    this.lastName = args.lastName
    this.year = args.year
    this.nationality = args.nationality
    this.citizenID = args.citizenID
    validate(this)
  }

  @PrimaryColumn({ type: 'char', length: 10 })
  @Length(10, 10, {message: 'studentID length must be 10'})
  @IsNumberString()
  studentID: string

  @Column({ type: 'varchar', length: 30 })
  @Length(1, 30)
  firstName: string

  @Column({ type: 'varchar', length: 30 })
  @Length(1, 30)
  lastName: string

  @Column('int')
  @Min(1)
  year: number

  @Column({ type: 'varchar', length: 2 })
  @Length(1, 2)
  nationality: string

  @Column({ type: 'char', length: 13 })
  @Length(13, 13)
  citizenID: string

  @OneToMany(type => EnrollmentFeePayment, payment => payment.payer)
  payments: EnrollmentFeePayment[]

  @ManyToOne(type => StudentGroup, studentGroup => studentGroup.students, {
    onDelete: 'SET NULL'
  })
  studentGroup: StudentGroup

  @ManyToOne(type => Teacher, teacher => teacher.studentsUnderSupervision, {
    onDelete: 'SET NULL'
  })
  supervisor: Teacher

  @ManyToOne(type => Department, department => department.students, {
    onDelete: 'SET NULL'
  })
  department: Department

  @OneToOne(type => SeniorProject)
  seniorProject: SeniorProject

  @ManyToMany(type => Section, section => section.students)
  sections: Section[]

  @OneToMany(type => Study, study => study.student)
  studies: Study[]
}
