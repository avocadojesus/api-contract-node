import { AcceptedNumberFormats } from '../../config/formats/number'

export default function validateNumber(value: any, format: string | null) {
  if (Array.isArray(value)) return false
  switch(format) {
  case AcceptedNumberFormats.Int:
  case AcceptedNumberFormats.BigInt:
    return /^\d{1,}$/.test(value)

  case AcceptedNumberFormats.Float:
    return /^\d{1,}\.\d{1,}$/.test(value)

  default:
    return typeof value === 'number'
  }
}


