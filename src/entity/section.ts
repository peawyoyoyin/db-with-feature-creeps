import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from 'typeorm'
import { CourseInstance } from './course-instance';
import { Teacher } from './teacher';

@Entity()
@Index((relation: Section) => [relation.courseInstance], {unique: true})
export class Section {
  @PrimaryGeneratedColumn({type: 'number'})
  sectionInstanceID: number

  @ManyToOne(type => CourseInstance, courseInstance => courseInstance.sections, {nullable: false})
  courseInstance: CourseInstance

  @Column({type: 'int'})
  capacity: number

  @ManyToOne(type => Teacher, teacher => teacher.sectionsTeached, {nullable: false})
  teacher: Teacher
}
