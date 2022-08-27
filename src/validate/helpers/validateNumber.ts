export default function validateNumber(value: any, format: string | null) {
  if (Array.isArray(value)) return false
  switch(format) {
  case 'int':
  case 'bigint':
    return /^\d{1,}$/.test(value)

  case 'float':
    return /^\d{1,}\.\d{1,}$/.test(value)

  default:
    return typeof value === 'number'
  }
}


