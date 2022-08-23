import { AcceptedNumberFormats, NUMBER_FORMATS } from '../config/number-formats'

export default function getNumberFormatFromDecorators(decorators: string[]): AcceptedNumberFormats | null {
  return decorators.filter(dec => !!NUMBER_FORMATS.includes(dec as AcceptedNumberFormats))[0] as AcceptedNumberFormats || null
}