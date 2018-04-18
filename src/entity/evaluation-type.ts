import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class EvaluationType {
  @PrimaryGeneratedColumn({ type: 'int' })
  typeID: number

  @Column({ type: 'int' })
  weight: number

  @Column({ type: 'varchar', length: 50 })
  description: string
}
