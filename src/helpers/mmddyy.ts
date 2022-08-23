export default function mmddyyyy(date: Date) {
  const year = date.getFullYear().toString().replace(/^\d\d/, '')

  let month = (1 + date.getMonth()).toString()
  month = month.length > 1 ? month : '0' + month

  let day = date.getDate().toString()
  day = day.length > 1 ? day : '0' + day

  return month + '-' + day + '-' + year
}
