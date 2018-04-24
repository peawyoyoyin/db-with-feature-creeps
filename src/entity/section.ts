import {
  Entity,
  Column,
  Index,
  ManyToOne,
  OneToMany,
  ManyToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  Timestamp
} from 'typeorm'
import { CourseInstance } from './course-instance'
import { Teacher } from './teacher'
import { Student } from './student'
import { Study } from './study.relation'
import { Length, IsPositive } from 'class-validator'
import { validate } from '~/utils'

interface SectionArgs {
  id: number
  sectionNumber: number
  capacity: number
  courseInstance: CourseInstance
  time?: string
  teacher?: Teacher
}

@Entity()
@Index("sectionNumber, courseInstance", (section: Section) => [section.courseInstance, section.sectionNumber], { unique: true })
export class Section {
  constructor(args: SectionArgs) {
    if (args === undefined) return
    this.id = args.id
    this.sectionNumber = args.sectionNumber
    this.capacity = args.capacity
    this.courseInstance = args.courseInstance
    this.time = args.time || 'TDF'
    this.teacher = this.teacher || null
    validate(this)
  }
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number

  @Column({ type: 'int' })
  sectionNumber: number

  @Column({ type: 'int' })
  capacity: number

  @Column({type: 'varchar', default: 'TDF'})
  time: string

  @ManyToOne(
    type => CourseInstance,
    courseInstance => courseInstance.sections,
    {
      onDelete: 'CASCADE',
      nullable: false
    }
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
