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

export enum HttpMethods {
  Get='GET',
  Post='POST',
  Put='PUT',
  Patch='PATCH',
  Delete='DELETE',
}

export enum BoolDecorators {
  Optional='optional',
}

export enum DateDecorators {
  Optional='optional',
  YYYYMMDD='yyyymmdd',
  YYMMDD='yymmdd',
  MMDDYYYY='mmddyyyy',
  MMDDYY='mmddyy',
}

export enum DatetimeDecorators {
  Optional='optional',
  Ansic='ansic',
  Kitchen='kitchen',
  ISO861='iso861',
  RFC1123='rfc1123',
  RFC1123Z='rfc1123z',
  RFC3339='rfc3339',
  RFC3339Nano='rfc3339_nano',
  RFC822='rfc822',
  RFC822Z='rfc822z',
  RFC850='rfc850',
  RubyDate='ruby_date',
  Stamp='stamp',
  StampMicro='stamp_micro',
  StampMilli='stamp_milli',
  StampNano='stamp_nano',
  Unix='unix',
  UnixAlternate='unix_date',
}

export enum NumberDecorators {
  Optional='optional',
  Int='int',
  Float='float',
  BigInt='bigint'
}

export enum StringDecorators {
  Optional='optional',
  UUID='uuid',
  Email='email',
  Name='name',
  FullName='fullname',
}

export enum CustomDecorators {
  Optional='optional',
}

