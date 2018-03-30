import { Entity, Column, Index, ManyToOne, OneToMany, ManyToMany, PrimaryColumn } from 'typeorm'
import { CourseInstance } from './course-instance'
import { Teacher } from './teacher'
import { Student } from './student'
import { Study } from './study'

@Entity()
export class Section {
  @PrimaryColumn({type: 'int'})
  sectionNumber: number

  @Column({type: 'int'})
  capacity: number

  @ManyToOne(type => CourseInstance, courseInstance => courseInstance.sections, {onDelete: 'CASCADE', primary: true})
  courseInstance: CourseInstance

  @ManyToOne(type => Teacher, teacher => teacher.sectionsTeached, {onDelete: 'SET NULL'})
  teacher: Teacher

  @ManyToMany(type => Student, student => student.sections)
  students: Student

  @OneToMany(type => Study, study => study.section)
  studies: Study[]
}
