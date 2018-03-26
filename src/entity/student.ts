import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class Student {
  @PrimaryColumn({type: 'varchar', length: 10})
  studentID: string

  @Column({type: 'varchar', length: 30})
  firstName: string

  @Column({type: 'varchar', length: 30})
  lastName: string

  @Column('int')
  year: number

  @Column({type: 'varchar', length: 2})
  nationality: string

  @Column({type: 'varchar', length: 13})
  citizenID: string
}
