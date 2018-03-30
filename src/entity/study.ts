import { Entity, PrimaryColumn, Column, ManyToOne } from 'typeorm'
import { Student } from './student'
import { Section } from './section'

@Entity()
export class Study {
  @ManyToOne(type => Student, student => student.studies, {primary: true})
  student: Student

  @ManyToOne(type => Section, section => section.studies, {primary: true})
  section: Section

  @Column({type: 'varchar', length: 1})
  gradeLetter: string
}
