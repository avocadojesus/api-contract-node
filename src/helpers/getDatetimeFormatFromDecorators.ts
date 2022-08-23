import { DATETIME_FORMATS, AcceptedDatetimeFormats } from "../config/formats"

export default function getDateFormatFromDecorators(decorators: string[]): AcceptedDatetimeFormats | null {
  return (decorators.filter(dec => !!DATETIME_FORMATS[dec as AcceptedDatetimeFormats])[0] as AcceptedDatetimeFormats) || null
}
