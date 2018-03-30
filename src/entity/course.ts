import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from 'typeorm'

import { CourseInstance } from './course-instance'
import { Teacher } from './teacher'

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

  @ManyToOne(type => Teacher, teacher => teacher.coursesOwned, {onDelete: 'SET NULL'})
  owner: Teacher
}
