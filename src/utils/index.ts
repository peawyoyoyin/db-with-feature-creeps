import { validateSync, } from 'class-validator'
export function validate(obj) {
  const errors = validateSync(obj)
  if (errors.length > 0) {
    const allMsg = errors.reduce((acc, error) => {
      const msg = JSON.stringify(error.constraints)
      return acc + '\n' + msg
    }, '')
    throw new Error(allMsg)
  }
}
