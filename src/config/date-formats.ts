export const YYYYMMDD_LUXON_FORMAT = 'y-LL-dd'
export const YYMMDD_LUXON_FORMAT = 'yy-LL-dd'
export const MMDDYYYY_LUXON_FORMAT = 'LL-dd-y'
export const MMDDYY_LUXON_FORMAT = 'LL-dd-yy'

export const YYYYMMDD_REGEX = /\d{4}-\d{2}-\d{2}/
export const YYMMDD_REGEX = /\d{2}-\d{2}-\d{2}/
export const MMDDYYYY_REGEX = /\d{2}-\d{2}-\d{4}/
export const MMDDYY_REGEX = /\d{2}-\d{2}-\d{2}/

export enum AcceptedDateFormats {
  YYYYMMDD='yyyymmdd',
  YYMMDD='yymmdd',
  MMDDYYYY='mmddyyyy',
  MMDDYY='mmddyy',
}

export const DATE_FORMATS = {
  [AcceptedDateFormats.YYYYMMDD]: {
    luxon: YYYYMMDD_LUXON_FORMAT,
    regex: YYYYMMDD_REGEX,
  },
  [AcceptedDateFormats.YYMMDD]: {
    luxon: YYMMDD_LUXON_FORMAT,
    regex: YYMMDD_REGEX,
  },
  [AcceptedDateFormats.MMDDYYYY]: {
    luxon: MMDDYYYY_LUXON_FORMAT,
    regex: MMDDYYYY_REGEX,
  },
  [AcceptedDateFormats.MMDDYY]: {
    luxon: MMDDYY_LUXON_FORMAT,
    regex: MMDDYY_REGEX,
  },
}
