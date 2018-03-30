import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm'
import { Student } from './student'
import { Semester } from './semester'

@Entity()
export class EnrollmentFeePayment {
  @PrimaryGeneratedColumn({type: 'int'})
  transactionID: number

  @Column({type: 'decimal'})
  amount: number

  @ManyToOne(type => Student, student => student.payments, {onDelete: 'SET NULL'})
  payer: Student

  @ManyToOne(type => Semester, semester => semester.payments, {onDelete: 'SET NULL'})
  semester: Semester
}
