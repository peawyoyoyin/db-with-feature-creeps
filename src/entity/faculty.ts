import { Entity, PrimaryColumn, Column } from 'typeorm'

Entity()
export class Faculty {
  @PrimaryColumn({type: 'varchar'})
  facultyID: string

  @Column({type: 'varchar'})
  name: string
}
