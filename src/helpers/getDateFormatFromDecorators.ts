import { AcceptedDateFormats, DATE_FORMATS } from '../config/formats/date'

export default function getDateFormatFromDecorators(decorators: string[]): AcceptedDateFormats | null {
  return decorators.filter(dec => !!DATE_FORMATS[dec as AcceptedDateFormats])[0] as AcceptedDateFormats || null
}
