import { DATETIME_FORMATS, AcceptedDatetimeFormats } from '../../config/formats/datetime'
import { UnrecognizedDatetimeFormat } from '../../config/exceptions'

export default function validateDatetime(value: any, format: AcceptedDatetimeFormats) {
  if (Array.isArray(value)) return false
  const formatConfig = DATETIME_FORMATS[format]
  if (!formatConfig) throw new UnrecognizedDatetimeFormat(format)
  return formatConfig.regex.test(value)
}
