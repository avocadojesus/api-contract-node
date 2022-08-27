export const UUID_REGEX = /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{4}-[a-zA-Z0-9]{12}$/
export const EMAIL_REGEX = /^.*@.*\..*$/
export const NAME_REGEX = /^[A-Za-z]*$/
export const FULL_NAME_REGEX = /^[A-Za-z'.]* [A-Za-z'.]*\s?[A-Za-z'.]{0,}\s?[A-Za-z'.]{0,}$/

export enum AcceptedStringFormats {
  UUID='uuid',
  Email='email',
  Name='name',
  FullName='fullname',
}

export const STRING_FORMATS = [
  AcceptedStringFormats.UUID,
  AcceptedStringFormats.Email,
  AcceptedStringFormats.Name,
  AcceptedStringFormats.FullName,
]
