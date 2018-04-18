import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { Student } from './student'
import {
  Length,
  Min,
  IsNumberString,
  Matches,
  IsPositive
} from 'class-validator'
import { validate } from '~/utils'
import { GroupYearRelation } from '~/entity/group-year.relation';

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

  @ManyToOne(type => GroupYearRelation, groupYearRelation => groupYearRelation.studentGroup)
  groupYearRelations: GroupYearRelation[]
}
