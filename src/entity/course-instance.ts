import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany } from 'typeorm'
import { Course } from './course';
import { Semester } from './semester'
import { Section } from './section'
import { AcademicYear } from '~/entity/academic-year';

interface CourseInstanceArgs {
  course: Course
  semester: Semester
  year: AcademicYear
}

@Entity()
export class CourseInstance {
  constructor(args: CourseInstanceArgs) {
    if (args === undefined) return
    this.course = args.course
    this.semester = args.semester
    this.year = args.year
  }

  @ManyToOne(type => Course, course => course.instances, { onDelete: 'CASCADE', primary: true })
  course: Course

  @ManyToOne(type => Semester, semester => semester.courseInstances, { onDelete: 'CASCADE', nullable: false, primary: true })
  semester: Semester

  @ManyToOne(type => AcademicYear, academicYear => academicYear.courseInstances, { onDelete: 'CASCADE', nullable: false, primary: true })
  year: AcademicYear

  @OneToMany(type => Section, section => section.courseInstance)
  sections: Section[]
}
