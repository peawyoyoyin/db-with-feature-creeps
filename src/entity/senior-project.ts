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
import { Evaluation } from './evaluation.relation'
import { Length, IsPositive } from 'class-validator'
import { validate } from '~/utils'
import { AcademicYear } from '~/entity/academic-year';

interface SeniorProjectArgs {
  topic: string
  year: number
}

@Entity()
export class SeniorProject {
  constructor(args: SeniorProjectArgs) {
    if (args === undefined) return
    this.topic = args.topic
    this.year = args.year
    validate(this)
  }
  @PrimaryGeneratedColumn({ type: 'int' })
  projectID: number

  @Column({ type: 'varchar', length: 100 })
  @Length(1, 100)
  topic: string

  @ManyToOne(type => AcademicYear, year => year.year)
  year: number

  @OneToOne(type => Student, student => student.seniorProject,{onDelete: 'CASCADE'})
  author: Student

  @ManyToOne(type => Teacher, teacher => teacher.seniorProjectsUnderSupervision)
  supervisor: Teacher

  @OneToMany(type => Evaluation, evaluation => evaluation.project)
  evaluations: Evaluation[]
}
