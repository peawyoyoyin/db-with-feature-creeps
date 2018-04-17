import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, PrimaryColumn, Index, OneToMany } from 'typeorm'
import { Faculty } from './faculty'
import { Student } from './student'
import { Teacher } from './teacher'
interface DepartmentArgs {
  name: string,
  faculty: Faculty
}
@Entity()
export class Department {
  constructor(args: DepartmentArgs) {
    if (args === undefined) return
    this.name = args.name
    this.faculty = args.faculty
  }

  @Column({type: 'varchar', length: 30, primary: true})
  name: string

  @ManyToOne(type => Faculty, faculty => faculty.departments, {onDelete: 'CASCADE', primary: true})
  faculty: Faculty

  @OneToMany(type => Student, student => student.department)
  students: Student[]

  @OneToMany(type => Teacher, teacher => teacher.department)
  teachers: Teacher[]
}
