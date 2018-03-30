import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, Index, OneToMany } from 'typeorm'
import { Faculty } from './faculty'
import { Student } from './student'
import { Teacher } from './teacher'

@Entity()
@Index((relation: Department) => [relation.departmentID, relation.faculty], {unique: true})
export class Department {
  @PrimaryGeneratedColumn({type: 'int'})
  departmentID: number

  @Column({type: 'varchar', length: 30})
  name: string

  @ManyToOne(type => Faculty, faculty => faculty.departments, {onDelete: 'CASCADE', nullable: false})
  faculty: Faculty

  @OneToMany(type => Student, student => student.department)
  students: Student[]

  @OneToMany(type => Teacher, teacher => teacher.department)
  teachers: Teacher[]
}
