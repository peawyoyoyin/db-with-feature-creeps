import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  JoinTable
} from 'typeorm'
import { SeniorProject } from './senior-project'
import { EvaluationType } from './evaluation-type'
import { Teacher } from './teacher'
import { Length, IsPositive } from 'class-validator'
import { validate } from '~/utils'

interface EvaluationArgs {
  id: number
  project: SeniorProject
  comment: string
  grade: number
}

@Entity()
export class Evaluation {
  constructor(args: EvaluationArgs) {
    if (args === undefined) return
    this.id = args.id
    this.project = args.project
    this.comment = args.comment
    this.grade = args.grade
    validate(this)
  }
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @ManyToOne(type => SeniorProject, seniorProject => seniorProject.evaluations)
  project: SeniorProject

  @ManyToOne(type => EvaluationType)
  evaluationType: EvaluationType

  @ManyToOne(type => Teacher, teacher => teacher.projectEvaluations)
  evaluator: Teacher

  @Column({ type: 'varchar', length: 300 })
  comment: string

  @Column({ type: 'int' })
  grade: number
}
