import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany } from 'typeorm'
import { Course } from './course';
import { Semester } from './semester'
import { Section } from './section'

@Entity()
export class CourseInstance {
  @ManyToOne(type => Course, course => course.instances, {onDelete: 'CASCADE', primary: true})
  course: Course

  @ManyToOne(type => Semester, semester => semester.courseInstances, {onDelete: 'CASCADE', nullable: false, primary: true})
  semester: Semester

  @OneToMany(type => Section, section => section.courseInstance)
  sections: Section[]
}
