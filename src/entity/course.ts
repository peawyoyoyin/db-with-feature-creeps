import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class Course {
  @PrimaryColumn({type: 'varchar', length: 7})
  courseID: string

  @Column({type: 'varchar', length: 30})
  name: string

  @Column({type: 'int'})
  credit: number
}
