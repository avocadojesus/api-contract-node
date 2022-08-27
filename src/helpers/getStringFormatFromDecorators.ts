import { AcceptedStringFormats, STRING_FORMATS } from '../config/formats/string'

export default function getStringFormatFromDecorators(decorators: string[]): AcceptedStringFormats | null {
  return decorators
    .filter(dec => !!STRING_FORMATS.includes(dec as AcceptedStringFormats))[0] as AcceptedStringFormats || null
}
