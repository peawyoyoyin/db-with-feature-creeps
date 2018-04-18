import {
  Entity,
  Column,
  Index,
  ManyToOne,
  OneToMany,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn
} from 'typeorm'
import { CourseInstance } from './course-instance'
import { Teacher } from './teacher'
import { Student } from './student'
import { Study } from './study'
import { Length, IsPositive } from 'class-validator'
import { validate } from '~/utils'

interface SectionArgs {
  id: number
  sectionNumber: number
  capacity: number
}

@Entity()
export class Section {
  constructor(args: SectionArgs) {
    if (args = undefined) return
    this.id = args.id
    this.sectionNumber = args.sectionNumber
    this.capacity = args.capacity
    validate(this)
  }
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'int' })
  sectionNumber: number

  @Column({ type: 'int' })
  capacity: number

  @ManyToOne(
    type => CourseInstance,
    courseInstance => courseInstance.sections,
    { onDelete: 'CASCADE' }
  )
  courseInstance: CourseInstance

  @ManyToOne(type => Teacher, teacher => teacher.sectionsTeached, {
    onDelete: 'SET NULL'
  })
  teacher: Teacher

  @ManyToMany(type => Student, student => student.sections)
  students: Student

  @OneToMany(type => Study, study => study.section)
  studies: Study[]
}
