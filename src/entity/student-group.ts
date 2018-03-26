import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { Student } from './student'

@Entity()
export class StudentGroup {
  @PrimaryGeneratedColumn({type: 'int'})
  groupID: number

  @OneToMany(type => Student, student => student.studentGroup)
  students: Student[]
}
