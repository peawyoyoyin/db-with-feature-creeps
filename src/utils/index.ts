import { validateSync } from 'class-validator'
export function validate(obj) {
  const errors = validateSync(obj)
  if (errors.length > 0) {
    console.log(errors)
    const allMsg = errors.map(error => {
      const msg = Object.values(error.constraints).join(', ')
      return msg
    })
    throw allMsg
  }
}
