export function enumToPgEnum<T extends Record<string, unknown>>(myEnum: T): [string, ...string[]] {
  return Object.values(myEnum).map((value) => `${value}`) as [string, ...string[]]
}