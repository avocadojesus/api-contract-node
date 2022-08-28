import { DateTime } from 'luxon'
import { DATE_FORMATS, AcceptedDateFormats } from '../../config/formats/date'

export default function dateString(format: AcceptedDateFormats) {
  const date = DateTime.now()
  const formatConfig = DATE_FORMATS[format]
  if (!formatConfig) throw `Invalid date format ${format}`

  return date.toFormat(formatConfig.luxon)
}

