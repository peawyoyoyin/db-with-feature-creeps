import { Entity, PrimaryColumn, Column, Index, ManyToOne, OneToMany, OneToOne } from 'typeorm'
import { AcademicYear } from './academic-year'
import { CourseInstance } from './course-instance'
import { EnrollmentFeePayment } from './enrollment-fee-payment'

@Entity()
export class Semester {
  @PrimaryColumn({type: 'int'})
  semesterNumber: number

  @Column({type: 'datetime'})
  startDate: Date

  @Column({type: 'datetime'})
  endDate: Date

  @Column({type: 'datetime'})
  lastSubjectRemovalDate: Date

  @Column({type: 'datetime'})
  lastWithdrawalDate: Date

  @ManyToOne(type => AcademicYear, academicYear => academicYear.semesters, {onDelete: 'CASCADE', nullable: false, primary: true})
  year: AcademicYear

  @OneToMany(type => CourseInstance, courseInstance => courseInstance.semester)
  courseInstances: CourseInstance[]

  @OneToMany(type => EnrollmentFeePayment, enrollmentFeePayment => enrollmentFeePayment.semester)
  payments: EnrollmentFeePayment[]
}
