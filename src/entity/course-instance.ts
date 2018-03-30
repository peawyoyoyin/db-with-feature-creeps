import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne, OneToMany } from 'typeorm'
import { Course } from './course';
import { Semester } from './semester'
import { Section } from './section'

/**
 * The primary, auto-generated field instanceID exists
 * because foreign keys as primary keys isn't supported yet in typeORM
 *
 * Here we use Index to indicate that the FK fields will be unique
 */

@Entity()
export class CourseInstance {
  @ManyToOne(type => Course, course => course.instances, {onDelete: 'CASCADE', primary: true})
  course: Course

  @ManyToOne(type => Semester, semester => semester.courseInstances, {onDelete: 'CASCADE', nullable: false, primary: true})
  semester: Semester

  @OneToMany(type => Section, section => section.courseInstance)
  sections: Section[]
}
