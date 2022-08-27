import { PrimaryDatatype } from '../config'

export interface ParsedDatatype {
  datatype: PrimaryDatatype
  decorators: string[]
  isArray: boolean
  isOptional: boolean
}

export default function parseDatatype(str: string): ParsedDatatype {
  const isArray = /\[\]$/.test(str)
  const [datatype, ...decorators] = str.replace(/\[\]$/, '').split(':')
  const isOptional = decorators.includes('optional')

  return {
    datatype: datatype as PrimaryDatatype,
    decorators,
    isArray,
    isOptional,
  }
}
