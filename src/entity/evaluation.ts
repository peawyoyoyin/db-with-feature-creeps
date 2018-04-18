import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { SeniorProject } from './senior-project'
import { EvaluationType } from './evaluation-type'
import { Teacher } from './teacher'

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @ManyToOne(type => SeniorProject, seniorProject => seniorProject.evaluations)
  project: SeniorProject

  @ManyToOne(type => EvaluationType)
  evaluationType: EvaluationType

  @ManyToMany(type => Teacher, teacher => teacher.projectEvaluations)
  evaluators: Teacher[]

  @Column({ type: 'varchar', length: 300 })
  comment: string

  @Column({ type: 'int' })
  grade: number
}
