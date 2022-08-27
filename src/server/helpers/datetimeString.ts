import { DateTime } from 'luxon'
import { DATETIME_FORMATS, AcceptedDatetimeFormats } from '../../config/datetime-formats'

export default function datetimeString(format: AcceptedDatetimeFormats) {
  const date = DateTime.now()
  const formatConfig = DATETIME_FORMATS[format]
  if (!formatConfig) throw `Unrecognized datetime format ${format}`

  if (format === AcceptedDatetimeFormats.ISO861) {
    return date.toISO()
  } else {
    return date.toFormat(formatConfig.luxon)
  }
}

