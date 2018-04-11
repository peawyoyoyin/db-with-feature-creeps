import { Entity, PrimaryColumn, Column, ManyToOne, ManyToMany } from 'typeorm'
import { SeniorProject } from './senior-project'
import { EvaluationType } from './evaluation-type'
import { Teacher } from './teacher';

@Entity()
export class Evaluation {
  @ManyToOne(type => SeniorProject, seniorProject => seniorProject.evaluations, { primary: true })
  project: SeniorProject

  @ManyToOne(type => EvaluationType, { primary: true })
  evaluationType: EvaluationType

  @ManyToMany(type => Teacher, teacher => teacher.projectEvaluations)
  evaluators: Teacher[]

  @Column({type: 'varchar', length: 300})
  comment: string

  @Column({type: 'int'})
  grade: number
}
