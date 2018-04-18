import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { AcademicYear } from './academic-year'
import { StudentGroup } from './student-group'

@Entity()
export class GroupYearRelation {
  @PrimaryGeneratedColumn({type: 'int'})
  relationID: number

  @Column({type: 'decimal'})
  fee: number

  @OneToMany(type => AcademicYear, academicYear => academicYear.groupYearRelations)
  year: AcademicYear

  @OneToMany(type => StudentGroup, studentGroup => studentGroup.groupYearRelations)
  studentGroup: StudentGroup
}
