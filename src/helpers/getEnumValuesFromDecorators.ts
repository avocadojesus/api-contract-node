import { ENUM_REGEX } from '../config/formats/enum'

export default function getEnumValuesFromDecorators(decorators: string[]): string[] {
  const enumDecorator = decorators.find(dec => ENUM_REGEX.test(dec))
  if (!enumDecorator) return []

  return enumDecorator
    .replace(/^enum/, '')
    .replace(/[\{\}]/g, '')
    .split(' ')
}
