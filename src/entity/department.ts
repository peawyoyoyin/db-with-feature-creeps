import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Faculty } from './faculty'

@Entity()
export class Department {
  @PrimaryGeneratedColumn({type: 'int'})
  departmentID: number

  @ManyToOne(type => Faculty)
  faculty: Faculty

  @Column({type: 'varchar', length: 30})
  name: string

}
