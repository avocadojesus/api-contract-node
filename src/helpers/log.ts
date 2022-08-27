export default function log(subject: any) {
  if (process.env.NODE_ENV !== 'test') console.log(subject)
}
