import { Entity, PrimaryColumn, Column, PrimaryGeneratedColumn } from 'typeorm'
import { Length, IsPositive } from 'class-validator'
import { validate } from '~/utils'

interface EvaluationTypeArgs {
  typeID: number
  weight: number
  description: string
}

@Entity()
export class EvaluationType {
  constructor(args: EvaluationTypeArgs) {
    if (args === undefined) return
    this.typeID = args.typeID
    this.weight = args.weight
    this.description = args.description
    validate(this)
  }
  @PrimaryGeneratedColumn({ type: 'int' })
  typeID: number

  @Column({ type: 'int' })
  weight: number

  @Column({ type: 'varchar', length: 50 })
  description: string
}
