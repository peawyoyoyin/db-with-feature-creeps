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

@Entity()
export class SeniorProject {
  @PrimaryGeneratedColumn({ type: 'int' })
  projectID: number

  @Column({ type: 'varchar', length: '100' })
  topic: string

  @Column({ type: 'int' })
  year: number

  @OneToOne(type => Student)
  author: Student

  @ManyToOne(type => Teacher, teacher => teacher.seniorProjectsUnderSupervision)
  supervisor: Teacher

  @OneToMany(type => Evaluation, evaluation => evaluation.project)
  evaluations: Evaluation[]
}
