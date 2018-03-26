import { Entity, PrimaryColumn, Column } from 'typeorm'

@Entity()
export class AcademicYear {
  @PrimaryColumn({type: 'int'})
  year: number
}
