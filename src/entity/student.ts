import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  OneToOne,
  JoinColumn
} from 'typeorm'
import { Length, Min, IsNumberString, NotEquals } from 'class-validator'
import { validate } from '~/utils'
import { StudentGroup } from './student-group'
import { EnrollmentFeePayment } from './enrollment-fee-payment'
import { Teacher } from './teacher'
import { Department } from './department'
import { Section } from './section'
import { Study } from './study.relation'
import { SeniorProject } from './senior-project'
import { AcademicYear } from '~/entity/academic-year'

interface StudentArgs {
  studentID: string
  password: string
  firstName: string
  lastName: string
  nationality: string
  citizenID: string
  department: Department
}
@Entity()
export class Student {
  constructor(args: StudentArgs) {
    if (args === undefined) return
    this.studentID = args.studentID
    this.password = args.password
    this.firstName = args.firstName
    this.lastName = args.lastName
    this.nationality = args.nationality
    this.citizenID = args.citizenID
    this.department = args.department
    validate(this)
  }

  @PrimaryColumn({ type: 'char', length: 10 })
  @Length(10, 10, { message: 'studentID length must be 10 characters' })
  @IsNumberString()
  studentID: string

  @Column({ type: 'varchar', length: 20 })
  password: string

  @Column({ type: 'varchar', length: 30 })
  @Length(1, 30)
  firstName: string

  @Column({ type: 'varchar', length: 30 })
  @Length(1, 30)
  lastName: string

  @ManyToOne(type => AcademicYear, AcademicYear => AcademicYear.students)
  year: AcademicYear

  @Column({ type: 'varchar', length: 2 })
  @Length(1, 2)
  nationality: string

  @Column({ type: 'char', length: 13, unique: true })
  @Length(13, 13, { message: 'citizenID length must be 13 characters' })
  @IsNumberString()
  citizenID: string

  @OneToMany(type => EnrollmentFeePayment, payment => payment.payer)
  payments: EnrollmentFeePayment[]

  @ManyToOne(type => StudentGroup, studentGroup => studentGroup.students, {
    onDelete: 'SET NULL'
  })
  studentGroup: StudentGroup

  @ManyToOne(type => Teacher, teacher => teacher.studentsUnderSupervision, {
    nullable: false,
  })
  supervisor: Teacher

  @ManyToOne(type => Department, department => department.students, {
    nullable: false
  })
  @NotEquals('none')
  department: Department

  @OneToOne(type => SeniorProject)
  @JoinColumn()
  seniorProject: SeniorProject

  @OneToMany(type => Study, study => study.student)
  studies: Study[]
}
