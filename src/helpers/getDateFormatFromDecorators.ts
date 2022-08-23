export const DATE_FORMATS = [
  'yyyymmdd',
  'yymmdd',
  'mmddyyyy',
  'mmddyy',
]

export default function getDateFormatFromDecorators(decorators: string[]) {
  return decorators.filter(dec => DATE_FORMATS.includes(dec))[0]
}
