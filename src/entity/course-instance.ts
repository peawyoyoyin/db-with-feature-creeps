import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from 'typeorm'
import { Course } from './course';
import { Semester } from './semester';

/**
 * The primary, auto-generated field instanceID exists 
 * because foreign keys as primary keys isn't supported yet in typeORM
 * 
 * Here we use Index to indicate that the FK fields will be unique
 */

@Entity()
@Index((relation: CourseInstance) => [relation.course, relation.semester], {unique: true})
export class CourseInstance {
  @PrimaryGeneratedColumn({type: 'int'})
  instanceID: number

  @ManyToOne(type => Course, course => course.instances)
  course: Course

  @ManyToOne(type => Semester, semester => semester.courseInstances)
  semester: Semester
}
