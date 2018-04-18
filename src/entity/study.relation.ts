import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Student } from './student'
import { Section } from './section'
import { Length, Min, IsNumberString, Matches } from 'class-validator'
import { validate } from '~/utils'

interface StudyArgs {
  gradeLetter: string
  student: Student
  section: Section
}
@Entity()
export class Study {
  constructor(args: StudyArgs) {
    if (args === undefined) return
    this.gradeLetter = args.gradeLetter
    this.student = args.student
    this.section = args.section
    validate(this)
  }
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @ManyToOne(type => Student, student => student.studies)
  student: Student

  @ManyToOne(type => Section, section => section.studies)
  section: Section

  @Column({ type: 'varchar', length: 2 })
  @Length(1, 2)
  @IsNumberString()
  @Matches(new RegExp('A|B+|B|C+|C|D+|D|F|W|S|U'))
  gradeLetter: string
}
