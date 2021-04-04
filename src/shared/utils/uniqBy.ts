export const uniqBy = (arr: any[], by: any) => {
  const tmp = new Set()
  return arr.filter((a) => !tmp.has(a[by]) && tmp.add(a[by]))
}
