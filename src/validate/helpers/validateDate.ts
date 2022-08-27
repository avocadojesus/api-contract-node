import { AcceptedDateFormats, DATE_FORMATS } from '../../config/formats/date'
import { UnrecognizedDateFormat } from '../../config/exceptions'

export default function validateDate(value: any, format: AcceptedDateFormats) {
  if (Array.isArray(value)) return false
  const formatConfig = DATE_FORMATS[format]
  if (!formatConfig) throw new UnrecognizedDateFormat(format)
  return formatConfig.regex.test(value)
}
