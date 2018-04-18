import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Student } from './student'
import {
  Length,
  Min,
  IsNumberString,
  Matches,
  IsPositive
} from 'class-validator'
import { validate } from '~/utils'

interface StudentGroupArgs {
  groupID: number
}
@Entity()
export class StudentGroup {
  constructor(args: StudentGroupArgs) {
    if (args === undefined) return
    this.groupID = args.groupID
    validate(this)
  }

  @PrimaryGeneratedColumn({ type: 'int' })
  @IsPositive()
  groupID: number

  @OneToMany(type => Student, student => student.studentGroup)
  students: Student[]
}
