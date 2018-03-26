import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, Index } from 'typeorm'
import { Faculty } from './faculty'

@Entity()
@Index((relation: Department) => [relation.departmentID, relation.faculty], {unique: true})
export class Department {
  @PrimaryGeneratedColumn({type: 'int'})
  departmentID: number

  @ManyToOne(type => Faculty)
  faculty: Faculty

  @Column({type: 'varchar', length: 30})
  name: string
}
