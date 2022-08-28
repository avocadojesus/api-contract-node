import { DateTime } from 'luxon'
import { DATE_FORMATS, AcceptedDateFormats } from '../../config/formats/date'

export default function dateString(format: AcceptedDateFormats | null) {
  const date = DateTime.now()
  const formatConfig = DATE_FORMATS[format as AcceptedDateFormats]
  return date.toFormat(formatConfig?.luxon || DATE_FORMATS.yyyymmdd.luxon)
}

