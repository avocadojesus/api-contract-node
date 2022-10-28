import { AcceptedStringFormats, STRING_FORMATS } from '../config/formats/string'
import { ENUM_REGEX } from '../config/formats/enum'

export default function getStringFormatFromDecorators(decorators: string[]): AcceptedStringFormats | null {
  return decorators
    .filter(dec =>
      !!STRING_FORMATS.includes(dec as AcceptedStringFormats) ||
        ENUM_REGEX.test(dec)
    )[0] as AcceptedStringFormats || null
}
