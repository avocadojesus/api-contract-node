import { AcceptedDateFormats, DATE_FORMATS } from '../../config/formats/date'

export default function validateDate(value: any, format: AcceptedDateFormats) {
  if (Array.isArray(value)) return false
  const formatConfig = DATE_FORMATS[format]
  if (!formatConfig) throw `Unrecognized datetime format ${format}`
  return formatConfig.regex.test(value)
}
