export interface ApiContractOptions {
  serializers?: { [key: string]: any }
}

export enum PrimaryDatatype {
  Bool='bool',
  Date='date',
  Datetime='datetime',
  Number='number',
  String='string',
}
