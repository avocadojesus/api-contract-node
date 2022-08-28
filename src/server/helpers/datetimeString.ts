import { DateTime } from 'luxon'
import { DATETIME_FORMATS, AcceptedDatetimeFormats } from '../../config/formats/datetime'

export default function datetimeString(format: AcceptedDatetimeFormats | null) {
  const date = DateTime.now()

  if (!format || format === AcceptedDatetimeFormats.ISO861) {
    return date.toISO()
  } else {
    const formatConfig = DATETIME_FORMATS[format as AcceptedDatetimeFormats] || DATETIME_FORMATS[AcceptedDatetimeFormats.ISO861]
    return date.toFormat(formatConfig.luxon)
  }
}

