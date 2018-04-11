import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm'
import { Teacher } from './teacher'
import { Student } from './student'

@Entity()
export class SeniorProject {
  @PrimaryGeneratedColumn({type: 'int'})
  projectID: number

  @Column({type: 'varchar', length: '100'})
  topic: string

  @Column({type: 'int'})
  year: number

  @OneToOne(type => Student)
  author: Student

  @ManyToOne(type => Teacher, teacher => teacher.seniorProjectsUnderSupervision)
  supervisor: Teacher
}
