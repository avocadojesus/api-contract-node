export default function endpointKey(httpMethod: string, endpointPath: string) {
  return `${httpMethod.toUpperCase()}:${endpointPath}`
}
