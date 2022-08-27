export default function parseDatatype(str: string): [string, string[], boolean, boolean] {
  const isArray = /\[\]$/.test(str)
  const [datatype, ...decorators] = str.replace(/\[\]$/, '').split(':')
  const isOptional = decorators.includes('optional')
  return [datatype, decorators, isArray, isOptional]
}
