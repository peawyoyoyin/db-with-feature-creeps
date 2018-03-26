import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { Semester } from './semester';

@Entity()
export class AcademicYear {
  @PrimaryColumn({type: 'int'})
  year: number

  @OneToMany(type => Semester, semester => semester.year)
  semesters: Semester[]
}
