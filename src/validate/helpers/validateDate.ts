import { AcceptedDateFormats, DATE_FORMATS } from '../../config/formats/date'
import { UnrecognizedDateFormat } from '../../config/exceptions'

export default function validateDate(key: string, value: any, format: AcceptedDateFormats) {
  if (Array.isArray(value)) return false
  const formatConfig = DATE_FORMATS[format]
  if (!formatConfig) throw new UnrecognizedDateFormat(key, format)
  return formatConfig.regex.test(value)
}
