import { Entity, PrimaryColumn, Column, OneToMany } from 'typeorm'
import { Semester } from './semester'
import { Min } from 'class-validator'

interface AcademicYearArgs{
  year:number
}

@Entity()
export class AcademicYear {
  constructor(args: AcademicYearArgs){
    if(args === undefined) return
    this.year = args.year
  }
  @PrimaryColumn({type: 'int',primary:true})
  @Min(1)
  year: number

  @OneToMany(type => Semester, semester => semester.year)
  semesters: Semester[]
}
