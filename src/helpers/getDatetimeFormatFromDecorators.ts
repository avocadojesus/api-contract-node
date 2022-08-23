export const ANSIC_FORMAT = 'ansic'
export const KITCHEN_FORMAT = 'kitchen'
export const RFC1123_FORMAT = 'rfc1123'
export const RFC1123Z_FORMAT = 'rfc1123z'
export const RFC3339_FORMAT = 'rfc3339'
export const RFC3339_NANO_FORMAT = 'rfc3339_nano'
export const RFC822_FORMAT = 'rfc822'
export const RFC822Z_FORMAT = 'rfc822z'
export const RFC850_FORMAT = 'rfc850'
export const RUBY_DATE_FORMAT = 'ruby_date'
export const STAMP_FORMAT = 'stamp'
export const STAMP_MICRO_FORMAT = 'stamp_micro'
export const STAMP_MILLI_FORMAT = 'stamp_milli'
export const STAMP_NANO_FORMAT = 'stamp_nano'
export const UNIX_FORMAT = 'unix'
export const UNIX_ALTERNATE_FORMAT = 'unix_date'
export const DATETIME_FORMATS = [
  ANSIC_FORMAT,
  KITCHEN_FORMAT,
  RFC1123_FORMAT,
  RFC1123Z_FORMAT,
  RFC3339_FORMAT,
  RFC3339_NANO_FORMAT,
  RFC822_FORMAT,
  RFC822Z_FORMAT,
  RFC850_FORMAT,
  RUBY_DATE_FORMAT,
  STAMP_FORMAT,
  STAMP_MICRO_FORMAT,
  STAMP_MILLI_FORMAT,
  STAMP_NANO_FORMAT,
  UNIX_FORMAT,
  UNIX_ALTERNATE_FORMAT,
]

export default function getDateFormatFromDecorators(decorators: string[]) {
  return decorators.filter(dec => DATETIME_FORMATS.includes(dec))[0]
}
