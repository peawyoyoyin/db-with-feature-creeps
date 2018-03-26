import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

Entity()
export class SeniorProject {
  @PrimaryGeneratedColumn({type: 'int'})
  projectID: number  
}
