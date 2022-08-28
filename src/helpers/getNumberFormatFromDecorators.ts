import { AcceptedNumberFormats, NUMBER_FORMATS } from '../config/formats/number'

export default function getNumberFormatFromDecorators(decorators: string[]): AcceptedNumberFormats | null {
  return decorators
    .filter(
      dec => !!NUMBER_FORMATS.includes(dec as AcceptedNumberFormats)
    )[0] as AcceptedNumberFormats ||
    AcceptedNumberFormats.Int
}
