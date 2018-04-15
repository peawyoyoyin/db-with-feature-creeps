import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { Department } from './department'

interface FacultyArgs {
  facultyID: string,
  name: string
}
@Entity()
export class Faculty {
  constructor(args: FacultyArgs) {
    if (args === undefined) return
    this.facultyID = args.facultyID
    this.name = args.name
  }

  @PrimaryColumn({type: 'varchar'})
  facultyID: string

  @Column({type: 'varchar'})
  name: string

  @OneToMany(type => Department, department => department.faculty)
  departments: Department[]
}
