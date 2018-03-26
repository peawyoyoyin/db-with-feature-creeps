import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

Entity()
export class SeniorProject {
  @PrimaryGeneratedColumn({type: 'int'})
  projectID: number

  @Column({type: 'varchar', length: '100'})
  topic: string

  @Column({type: 'int'})
  year: number
}
