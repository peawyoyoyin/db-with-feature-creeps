import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Student } from './student'

@Entity()
export class EnrollmentFeePayment {
  @PrimaryGeneratedColumn({type: 'int'})
  transactionID: number

  @Column({type: 'decimal'})
  amount: number

  @ManyToOne(type => Student, student => student.payments)
  payer: Student
}
