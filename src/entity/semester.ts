import {
  Entity,
  PrimaryColumn,
  Column,
  Index,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { AcademicYear } from './academic-year'
import { CourseInstance } from './course-instance'
import { EnrollmentFeePayment } from './enrollment-fee-payment'

import { Length } from 'class-validator'
import { validate } from '~/utils'

interface SemesterArgs {
  semesterNumber: number
  startDate: Date
  endDate: Date
  lastSubjectRemovalDate: Date
  lastWithdrawalDate: Date
  year: AcademicYear
}

@Entity()
@Index("semesterNumber, year", (semester: Semester) => [semester.semesterNumber, semester.year], { unique: true })
export class Semester {
  constructor(args: SemesterArgs) {
    if (args === undefined) return
    this.semesterNumber = args.semesterNumber
    this.startDate = args.startDate
    this.endDate = args.endDate
    this.lastSubjectRemovalDate = args.lastSubjectRemovalDate
    this.lastWithdrawalDate = args.lastWithdrawalDate
    this.year = args.year
    validate(this)
  }
  @PrimaryGeneratedColumn() id: number

  @Column({ type: 'int' })
  semesterNumber: number

  @Column({ type: 'date' })
  startDate: Date

  @Column({ type: 'date' })
  endDate: Date

  @Column({ type: 'date' })
  lastSubjectRemovalDate: Date

  @Column({ type: 'date' })
  lastWithdrawalDate: Date

  @ManyToOne(type => AcademicYear, academicYear => academicYear.semesters, {
    onDelete: 'CASCADE',
    nullable: false
  })
  year: AcademicYear

  @OneToMany(type => CourseInstance, courseInstance => courseInstance.semester)
  courseInstances: CourseInstance[]

  @OneToMany(
    type => EnrollmentFeePayment,
    enrollmentFeePayment => enrollmentFeePayment.semester
  )
  payments: EnrollmentFeePayment[]
}
