import { Entity, PrimaryColumn, Column, OneToMany, ManyToMany, ManyToOne } from 'typeorm'
import { Student } from './student'
import { Section } from './section'
import { Course } from './course'
import { Department } from './department'

@Entity()
export class Teacher {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  teacherID: string

  @Column({ type: 'varchar', length: 30 })
  firstName: string

  @Column({ type: 'varchar', length: 30 })
  lastName: string

  @Column({ type: 'varchar', length: 3 })
  abbrName: string

  @Column({ type: 'varchar', length: 13 })
  citizenID: string

  @OneToMany(type => Student, student => student.supervisor)
  studentsUnderSupervision: Student[]

  @OneToMany(type => Section, section => section.teacher)
  sectionsTeached: Section[]

  @OneToMany(type => Course, course => course.owner)
  coursesOwned: Course[]

  @ManyToOne(type => Department, department => department.teachers, {onDelete: 'SET NULL'})
  department: Department
}
