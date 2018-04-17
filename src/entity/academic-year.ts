import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { Semester } from './semester'
import { Min } from 'class-validator'
import { CourseInstance } from '~/entity/course-instance';

interface AcademicYearArgs {
  year: number
}

@Entity()
export class AcademicYear {
  constructor(args: AcademicYearArgs) {
    if (args === undefined) return
    this.year = args.year
  }
  @Column({ type: 'int', primary: true })
  year: number

  @OneToMany(type => Semester, semester => semester.year)
  semesters: Semester[]
}
