export default function validateBool(value: any, isOptional: boolean) {
  if (Array.isArray(value)) return false
  return typeof value === 'boolean'
}
