const clone = <T>(arr: T[]): T[] => [...arr]

const removeIndex = <T>(i: number, arr: T[]): T[] => [
  ...arr.slice(0, i),
  ...arr.slice(i + 1),
]

const concat = <T>(a: T[], b: T[]): T[] => [...a, ...b]

const flatten = <T>(arr: T[][]): T[] => {
  return arr.reduce((out, arr2) => concat(out, arr2), [])
}

const first = <T>(arr: T[]): T => {
  return arr.length > 0 ? arr[0] : null
}

const last = <T>(arr: T[]): T => {
  return arr.length > 0 ? arr[arr.length - 1] : null
}

const difference = <T>(a: T[], b: T[]): T[] => {
  return a.filter((item) => b.indexOf(item) < 0)
}

export { clone, removeIndex, concat, flatten, first, last, difference }
