import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany } from 'typeorm'
import { StudentGroup } from './student-group'
import { EnrollmentFeePayment } from './enrollment-fee-payment'
import { Teacher } from './teacher';

@Entity()
export class Student {
  @PrimaryColumn({type: 'varchar', length: 10})
  studentID: string

  @Column({type: 'varchar', length: 30})
  firstName: string

  @Column({type: 'varchar', length: 30})
  lastName: string

  @Column('int')
  year: number

  @Column({type: 'varchar', length: 2})
  nationality: string

  @Column({type: 'varchar', length: 13})
  citizenID: string

  @OneToMany(type => EnrollmentFeePayment, payment => payment.payer)
  payments: EnrollmentFeePayment[]

  @ManyToOne(type => StudentGroup, studentGroup => studentGroup.students)
  studentGroup: StudentGroup

  @ManyToOne(type => Teacher, teacher => teacher.studentsUnderSupervision)
  supervisor: Teacher
}
