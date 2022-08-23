export const ANSIC_LUXON_FORMAT = 'ccc MMM dd HH:mm:ss y'
export const KITCHEN_LUXON_FORMAT = 'hh:mma'
export const RFC1123_LUXON_FORMAT = 'ccc, dd MMM y HH:mm:ss ZZZZ'
export const RFC1123Z_LUXON_FORMAT = 'ccc, dd MMM y HH:mm:ss ZZZ'
export const RFC3339_LUXON_FORMAT = "y-MM-dd'T'HH:mm:ssZZ"
export const RFC3339_NANO_LUXON_FORMAT = "y-MM-dd'T'HH:mm:ss.SZZ"
export const RFC822_LUXON_FORMAT = 'dd MMM yy HH:mm ZZZZ'
export const RFC822Z_LUXON_FORMAT = 'dd MMM yy HH:mm ZZZ'
export const RFC850_LUXON_FORMAT = 'cccc, dd-MMM-yy HH:mm:ss ZZZZ'
export const RUBY_DATE_LUXON_FORMAT = 'ccc MMM dd HH:mm:ss ZZZ y'
export const STAMP_LUXON_FORMAT = 'MMM dd HH:mm:ss'
export const STAMP_MICRO_LUXON_FORMAT = 'MMM dd HH:mm:ss.S'
export const STAMP_MILLI_LUXON_FORMAT = 'MMM dd HH:mm:ss.S'
export const STAMP_NANO_LUXON_FORMAT = 'MMM dd HH:mm:ss.S'
export const UNIX_LUXON_FORMAT = 'ccc MMM dd HH:mm:ss ZZZZ y'

export const ANSIC_REGEX = /^[a-zA-Z]+ [a-zA-Z]+ \d{2} \d{2}:\d{2}:\d{2} \d{4}$/
export const KITCHEN_REGEX = /\d{1,2}:\d{2}(AM|PM)/
export const RFC1123_REGEX = /^[a-zA-Z]+, \d{1,2} [a-zA-Z]+ \d{4} \d{2}:\d{2}:\d{2} [A-Z]{3}/
export const RFC1123Z_REGEX = /^[a-zA-Z]+, \d{1,2} [a-zA-Z]+ \d{4} \d{2}:\d{2}:\d{2} (\+|-)\d{4}/
export const RFC3339_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\+|-)\d{2}:\d{2}/
export const RFC3339_NANO_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{2,6}(\+|-)\d{2}:\d{2}/
export const RFC822_REGEX = /^\d{1,2} [a-zA-Z]+ \d{2} \d{2}:\d{2} [A-Z]{3}/
export const RFC822Z_REGEX = /^\d{1,2} [a-zA-Z]+ \d{2} \d{2}:\d{2} (\+|-)\d{4}/
export const RFC850_REGEX = /^[A-Za-z]+, \d{2}-[A-Za-z]+-\d{2} \d{2}:\d{2}:\d{2} [A-Z]{3}/
export const RUBY_DATE_REGEX = /^[A-Za-z]+ [A-Za-z]+ \d{2} \d{2}:\d{2}:\d{2} (\+|-)\d{4} \d{4}/
export const STAMP_REGEX = /^[A-Za-z]{3} \d{2} \d{2}:\d{2}:\d{2}/
export const STAMP_MICRO_REGEX = /^[A-Za-z]{3} \d{2} \d{2}:\d{2}:\d{2}\.\d+/
export const STAMP_MILLI_REGEX = /^[A-Za-z]{3} \d{2} \d{2}:\d{2}:\d{2}\.\d+/
export const STAMP_NANO_REGEX = /^[A-Za-z]{3} \d{2} \d{2}:\d{2}:\d{2}\.\d+/
export const UNIX_REGEX = /^[a-zA-Z]+ [a-zA-Z]+ \d{2} \d{2}:\d{2}:\d{2} [A-Z]{3} \d{4}$/
export const ISO861_DATETIME_REGEX = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d*(\+|-)\d{2}:\d{2}/

export enum AcceptedDatetimeFormats {
  Ansic='ansic',
  Kitchen='kitchen',
  ISO861='iso861',
  RFC1123='rfc1123',
  RFC1123Z='rfc1123z',
  RFC3339='rfc3339',
  RFC3339Nano='rfc3339_nano',
  RFC822='rfc822',
  RFC822Z='rfc822z',
  RFC850='rfc850',
  RubyDate='ruby_date',
  Stamp='stamp',
  StampMicro='stamp_micro',
  StampMilli='stamp_milli',
  StampNano='stamp_nano',
  Unix='unix',
  UnixAlternate='unix_date',
}

export const DATETIME_FORMATS = {
  [AcceptedDatetimeFormats.Ansic]: {
    luxon: ANSIC_LUXON_FORMAT,
    regex: ANSIC_REGEX,
  },
  [AcceptedDatetimeFormats.Kitchen]: {
    luxon: KITCHEN_LUXON_FORMAT,
    regex: KITCHEN_REGEX,
  },
  [AcceptedDatetimeFormats.ISO861]: {
    luxon: '',
    regex: ISO861_DATETIME_REGEX,
  },
  [AcceptedDatetimeFormats.RFC1123]: {
    luxon: RFC1123_LUXON_FORMAT,
    regex: RFC1123_REGEX,
  },
  [AcceptedDatetimeFormats.RFC1123Z]: {
    luxon: RFC1123Z_LUXON_FORMAT,
    regex: RFC1123Z_REGEX,
  },
  [AcceptedDatetimeFormats.RFC3339]: {
    luxon: RFC3339_LUXON_FORMAT,
    regex: RFC3339_REGEX,
  },
  [AcceptedDatetimeFormats.RFC3339Nano]: {
    luxon: RFC3339_NANO_LUXON_FORMAT,
    regex: RFC3339_NANO_REGEX,
  },
  [AcceptedDatetimeFormats.RFC822]: {
    luxon: RFC822_LUXON_FORMAT,
    regex: RFC822_REGEX,
  },
  [AcceptedDatetimeFormats.RFC822Z]: {
    luxon: RFC822Z_LUXON_FORMAT,
    regex: RFC822Z_REGEX,
  },
  [AcceptedDatetimeFormats.RFC850]: {
    luxon: RFC850_LUXON_FORMAT,
    regex: RFC850_REGEX,
  },
  [AcceptedDatetimeFormats.RubyDate]: {
    luxon: RUBY_DATE_LUXON_FORMAT,
    regex: RUBY_DATE_REGEX,
  },
  [AcceptedDatetimeFormats.Stamp]: {
    luxon: STAMP_LUXON_FORMAT,
    regex: STAMP_REGEX,
  },
  [AcceptedDatetimeFormats.StampMicro]: {
    luxon: STAMP_MICRO_LUXON_FORMAT,
    regex: STAMP_MICRO_REGEX,
  },
  [AcceptedDatetimeFormats.StampMilli]: {
    luxon: STAMP_MILLI_LUXON_FORMAT,
    regex: STAMP_MILLI_REGEX,
  },
  [AcceptedDatetimeFormats.StampNano]: {
    luxon: STAMP_NANO_LUXON_FORMAT,
    regex: STAMP_NANO_REGEX,
  },
  [AcceptedDatetimeFormats.Unix]: {
    luxon: UNIX_LUXON_FORMAT,
    regex: UNIX_REGEX,
  },
  [AcceptedDatetimeFormats.UnixAlternate]: {
    luxon: UNIX_LUXON_FORMAT,
    regex: UNIX_REGEX,
  },
}
