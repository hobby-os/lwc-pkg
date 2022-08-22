export function convertDashToHump(str: string, isBigHump: boolean) {
  str = str || ''
  let newStr = str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))

  if (isBigHump) {
    newStr = newStr.replace(/^(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
  }

  return newStr
}
