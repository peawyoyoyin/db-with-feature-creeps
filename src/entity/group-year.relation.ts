import { Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm'
import { AcademicYear } from './academic-year'
import { StudentGroup } from './student-group'
import { Length, IsPositive } from 'class-validator'
import { validate } from '~/utils'

interface GroupYearRelationArgs {
  relationID: number
  fee: number
  summerFee: number
  year: AcademicYear
  studentGroup: StudentGroup
}

@Entity()
export class GroupYearRelation {
  constructor(args: GroupYearRelationArgs) {
    if (args === undefined) return
    this.relationID = args.relationID
    this.fee = args.fee
    this.summerFee = args.summerFee
    this.year = args.year
    this.studentGroup = args.studentGroup
    validate(this)
  }
  @PrimaryGeneratedColumn({type: 'int'})
  relationID: number

  @Column({type: 'decimal'})
  fee: number

  @Column({type: 'decimal'})
  summerFee: number

  @OneToMany(type => AcademicYear, academicYear => academicYear.groupYearRelations, {nullable: false})
  year: AcademicYear

  @OneToMany(type => StudentGroup, studentGroup => studentGroup.groupYearRelations, {nullable: false})
  studentGroup: StudentGroup
}
