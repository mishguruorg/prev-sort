const clone = (arr) => [ ...arr ]

const removeIndex = (i, arr) => [ ...arr.slice(0, i), ...arr.slice(i + 1) ]

const concat = (a, b) => [ ...a, ...b ]

const flatten = (arr) => {
  return arr.reduce((out, arr2) => concat(out, arr2), [])
}

const first = (array) => {
  return array.length > 0
    ? array[0]
    : null
}

const last = (array) => {
  return array.length > 0
    ? array[array.length - 1]
    : null
}

const difference = (a, b) => {
  return a.filter((item) => b.indexOf(item) < 0)
}

export {
  clone,
  removeIndex,
  concat,
  flatten,
  first,
  last,
  difference
}
