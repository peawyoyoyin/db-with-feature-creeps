import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToOne,
  OneToMany
} from 'typeorm'
import { Course } from './course'
import { Semester } from './semester'
import { Section } from './section'
import { AcademicYear } from '~/entity/academic-year'
import { Study } from '~/entity/study.relation';

interface CourseInstanceArgs {
  course: Course
  semester: Semester
}

@Entity()
@Index("course, semester", (courseInstance: CourseInstance) => [courseInstance.course, courseInstance.semester], { unique: true })
export class CourseInstance {
  constructor(args: CourseInstanceArgs) {
    if (args === undefined) return
    this.course = args.course
    this.semester = args.semester
  }

  @PrimaryGeneratedColumn({type: 'int'}) id: number

  @ManyToOne(type => Course, course => course.instances, {
    onDelete: 'CASCADE'
  })
  course: Course

  @ManyToOne(type => Semester, semester => semester.courseInstances, {
    onDelete: 'CASCADE',
    nullable: false
  })
  semester: Semester

  @OneToMany(type => Section, section => section.courseInstance)
  sections: Section[]

  @OneToMany(type => Study, study => study.instance)
  studies: Study
}
