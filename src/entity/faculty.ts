import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { Department } from './department'

@Entity()
export class Faculty {
  @PrimaryColumn({type: 'varchar'})
  facultyID: string

  @Column({type: 'varchar'})
  name: string

  @OneToMany(type => Department, department => department.faculty)
  departments: Department[]
}
