import { Entity, PrimaryGeneratedColumn, Column, Index, ManyToOne } from 'typeorm'
import { CourseInstance } from './course-instance';

@Entity()
@Index((relation: Section) => [relation.courseInstance], {unique: true})
export class Section {
  @PrimaryGeneratedColumn({type: 'number'})
  sectionInstanceID: number

  @ManyToOne(type => CourseInstance, courseInstance => courseInstance.sections)
  courseInstance: CourseInstance

  @Column({type: 'int'})
  capacity: number
}
