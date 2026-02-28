export function isJSONString(str: any) {
  try {
    JSON.parse(str)
    return true
  } catch {
    return false
  }
}
