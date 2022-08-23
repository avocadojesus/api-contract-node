export default function parseDatatype(str: string) {
  const isArray = /\[\]$/.test(str)
  const [datatype, ...decorators] = str.replace(/\[\]$/, '').split(':')
  return [datatype, decorators, isArray]
}
