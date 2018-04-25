import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne
} from 'typeorm'
import { Student } from './student'
import { Semester } from './semester'
import { Length, IsPositive } from 'class-validator'
import { validate } from '~/utils'

interface EnrollmentFeePaymentArgs {
  transactionID?: number
  amount: number
}

@Entity()
export class EnrollmentFeePayment {
  constructor(args: EnrollmentFeePaymentArgs) {
    if (args === undefined) return
    this.transactionID = args.transactionID
    this.amount = args.amount
    validate(this)
  }
  @PrimaryGeneratedColumn({ type: 'int' })
  transactionID: number

  @Column({ type: 'decimal' })
  amount: number

  @ManyToOne(type => Student, student => student.payments)
  payer: Student

  @ManyToOne(type => Semester, semester => semester.payments)
  semester: Semester
}
