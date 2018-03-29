import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany, ManyToMany } from 'typeorm'
import { CourseInstance } from './course-instance';
import { Teacher } from './teacher';
import { Student } from './student';

@Entity()
@Index((relation: Section) => [relation.courseInstance], {unique: true})
export class Section {
  @PrimaryGeneratedColumn({type: 'int'})
  sectionInstanceID: number

  @Column({type: 'int'})
  capacity: number

  @ManyToOne(type => CourseInstance, courseInstance => courseInstance.sections, {onDelete: 'CASCADE', nullable: false})
  courseInstance: CourseInstance

  @ManyToOne(type => Teacher, teacher => teacher.sectionsTeached, {onDelete: 'SET NULL'})
  teacher: Teacher

  @ManyToMany(type => Student, student => student.sections)
  students: Student
}
