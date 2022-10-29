export default function getCountFromDecorators(decorators: string[]): number {
  const regex = /^count\{(\d*)\}$/
  const count = decorators.find(dec => regex.test(dec))
  if (count)
    return Math.min(
      parseInt(count.match(regex)![1]),
      100
    )

  return 6
}
