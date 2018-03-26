import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'

import { CourseInstance } from './course-instance'

@Entity()
export class Course {
  @PrimaryColumn({type: 'varchar', length: 7})
  courseID: string

  @Column({type: 'varchar', length: 30})
  name: string

  @Column({type: 'int'})
  credit: number

  @OneToMany(type => CourseInstance, courseInstance => courseInstance.course)
  instances: CourseInstance[]
}
