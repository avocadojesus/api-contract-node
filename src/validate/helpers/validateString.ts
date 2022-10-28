import {
  AcceptedStringFormats,
  UUID_REGEX,
  NAME_REGEX,
  EMAIL_REGEX,
  FULL_NAME_REGEX,
} from '../../config/formats/string'

export default function validateString(value: any, format: string | null) {
  if (Array.isArray(value)) return false
  if (!value || typeof value === 'boolean') return false

  switch(format) {
  case AcceptedStringFormats.UUID:
    return UUID_REGEX.test(value)

  case AcceptedStringFormats.Email:
    return EMAIL_REGEX.test(value)

  case AcceptedStringFormats.Name:
    return NAME_REGEX.test(value)

  case AcceptedStringFormats.FullName:
    return FULL_NAME_REGEX.test(value)

  default:
    return typeof value === 'string'
  }
}


