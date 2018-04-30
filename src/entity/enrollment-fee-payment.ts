import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  Index,
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
@Index(
  'student, semester',
  (payment: EnrollmentFeePayment) => [payment.payer, payment.semester],
  { unique: true }
)
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

  @ManyToOne(type => Student, student => student.payments, { nullable: false })
  payer: Student

  @ManyToOne(type => Semester, semester => semester.payments, {
    nullable: false,
  })
  semester: Semester
}
