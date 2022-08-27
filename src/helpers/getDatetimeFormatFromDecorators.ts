import { DATETIME_FORMATS, AcceptedDatetimeFormats } from "../config/datetime-formats"

export default function getDatetimeFormatFromDecorators(decorators: string[]): AcceptedDatetimeFormats | null {
  return (decorators.filter(dec => !!DATETIME_FORMATS[dec as AcceptedDatetimeFormats])[0] as AcceptedDatetimeFormats) || null
}
