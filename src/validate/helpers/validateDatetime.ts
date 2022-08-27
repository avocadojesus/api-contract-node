import { DATETIME_FORMATS, AcceptedDatetimeFormats } from '../../config/datetime-formats'

export default function validateDatetime(value: any, format: AcceptedDatetimeFormats) {
  if (Array.isArray(value)) return false
  const formatConfig = DATETIME_FORMATS[format]
  if (!formatConfig) throw `Unrecognized datetime format ${format}`
  return formatConfig.regex.test(value)
}
