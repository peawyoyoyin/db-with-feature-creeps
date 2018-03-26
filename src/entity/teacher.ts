import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class Teacher {
  @PrimaryColumn({ type: 'varchar', length: 10 })
  teacherID: string

  @Column({ type: 'varchar', length: 30 })
  firstName: string

  @Column({ type: 'varchar', length: 30 })
  lastName: string

  @Column({ type: 'varchar', length: 3})
  abbrName: string

  @Column({ type: 'varchar', length: 13 })
  citizenID: string
}
