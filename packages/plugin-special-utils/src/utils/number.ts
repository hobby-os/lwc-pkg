export function floatMinus(value1: string | number, value2: string | number, fixedCount: number) {
  value1 = `${value1 || 0}`
  value1 = Number.parseFloat(value1)

  value2 = `${value2 || 0}`
  value2 = Number.parseFloat(value2)

  return (value1 - value2).toFixed(fixedCount)
}
