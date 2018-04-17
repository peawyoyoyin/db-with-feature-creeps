import { Entity, PrimaryColumn, Column, OneToMany, ManyToOne } from 'typeorm'

import { CourseInstance } from './course-instance'
import { Teacher } from './teacher'

import {
  IsNumberString, 
  IsUppercase,
  Length
} from 'class-validator'

interface CourseArgs {
  courseID: string
  abbreviate: string
  name: string
  credit: number
}

@Entity()
export class Course {
  constructor(args: CourseArgs){
    if(args === undefined) return
    this.courseID = args.courseID
    this.abbreviate = args.abbreviate
    this.name = args.name
    this.credit = args.credit
  }
  @Column({type: 'varchar', length: 7,primary:true})
  @IsNumberString()
  courseID: string

  @Column({type:'varchar',length:30})
  @IsUppercase()
  abbreviate: string

  @Column({type: 'varchar', length: 100})
  @IsUppercase()
  name: string

  @Column({type: 'int'})
  @Length(1,1)
  credit: number

  @OneToMany(type => CourseInstance, courseInstance => courseInstance.course)
  instances: CourseInstance[]

  @ManyToOne(type => Teacher, teacher => teacher.coursesOwned, {onDelete: 'SET NULL'})
  owner: Teacher
}
