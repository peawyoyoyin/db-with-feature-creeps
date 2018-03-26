import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany } from 'typeorm'
import { AcademicYear } from './academic-year';
import { CourseInstance } from './course-instance';

@Entity()
@Index((relation: Semester) => [relation.semesterNumber, relation.year], {unique: true})
export class Semester {
  @PrimaryGeneratedColumn({type: 'int'})
  semesterID: number

  @Column({type: 'int'})
  semesterNumber: number

  @ManyToOne(type => AcademicYear, academicYear => academicYear.semesters)
  year: AcademicYear

  @Column({type: 'datetime'})
  startDate: Date

  @Column({type: 'datetime'})
  endDate: Date

  @Column({type: 'datetime'})
  lastSubjectRemovalDate: Date

  @Column({type: 'datetime'})
  lastWithdrawalDate: Date

  @OneToMany(type => CourseInstance, courseInstance => courseInstance.semester)
  courseInstances: CourseInstance[]
}
