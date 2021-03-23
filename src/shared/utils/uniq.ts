export const uniq = (arr: any[]) => {
  const tmp = new Set()
  return arr.filter((a) => !tmp.has(a) && tmp.add(a))
}
