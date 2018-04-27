import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from 'typeorm'
import { Semester } from './semester'
import { Min } from 'class-validator'
import { CourseInstance } from '~/entity/course-instance'
import { GroupYearRelation } from '~/entity/group-year.relation'
import { SeniorProject } from '~/entity/senior-project'
import { validate } from '~/utils'
import { Student } from '~/entity/student';

interface AcademicYearArgs {
  year: number
}

@Entity()
export class AcademicYear {
  constructor(args: AcademicYearArgs) {
    if (args === undefined) return
    this.year = args.year
    validate(this)
  }
  @Column({ type: 'int', primary: true })
  @Min(1)
  year: number

  @OneToMany(type => Semester, semester => semester.year)
  semesters: Semester[]

  @OneToMany(type => GroupYearRelation, groupYearRelation => groupYearRelation.year)
  groupYearRelations: GroupYearRelation[]

  @OneToMany(type => Student, student => student.year)
  students: Student[]

  @OneToMany(type => SeniorProject, seniorProject => seniorProject.year)
  seniorProjects: SeniorProject[]
}
