import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  OneToMany
} from 'typeorm'
import { Teacher } from './teacher'
import { Student } from './student'
import { Evaluation } from './evaluation'
import { Length, IsPositive } from 'class-validator'
import { validate } from '~/utils'

interface SeniorProjectArgs {
  projectID: number
  topic: string
  year: number
}

@Entity()
export class SeniorProject {
  constructor(args: SeniorProjectArgs) {
    if (args === undefined) return
    this.projectID = args.projectID
    this.topic = args.topic
    this.year = args.year
    validate(this)
  }
  @PrimaryGeneratedColumn({ type: 'int' })
  @IsPositive()
  projectID: number

  @Column({ type: 'varchar', length: 100 })
  @Length(1, 100)
  topic: string

  @Column({ type: 'int' })
  @IsPositive()
  year: number

  @OneToOne(type => Student)
  author: Student

  @ManyToOne(type => Teacher, teacher => teacher.seniorProjectsUnderSupervision)
  supervisor: Teacher

  @OneToMany(type => Evaluation, evaluation => evaluation.project)
  evaluations: Evaluation[]
}
