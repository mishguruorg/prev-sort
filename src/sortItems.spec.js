import test from 'ava'

import sortItems from './sortItems'

test('should sort items (single chain)', (t) => {
  const input = [
    { id: 6, previousId: 5 },
    { id: 5, previousId: 4 },
    { id: 4, previousId: 3 },
    { id: 3, previousId: 2 },
    { id: 2, previousId: 1 },
    { id: 1, previousId: null }
  ]

  const output = sortItems(input)

  const expected = [
    { id: 1, previousId: null },
    { id: 2, previousId: 1 },
    { id: 3, previousId: 2 },
    { id: 4, previousId: 3 },
    { id: 5, previousId: 4 },
    { id: 6, previousId: 5 }
  ]

  t.deepEqual(output, expected)
})

test('should sort items (random chain)', (t) => {
  const input = [
    { id: 1, previousId: null },
    { id: 6, previousId: 5 },
    { id: 4, previousId: 3 },
    { id: 2, previousId: 1 },
    { id: 5, previousId: 4 },
    { id: 3, previousId: 2 }
  ]

  const output = sortItems(input)

  const expected = [
    { id: 1, previousId: null },
    { id: 2, previousId: 1 },
    { id: 3, previousId: 2 },
    { id: 4, previousId: 3 },
    { id: 5, previousId: 4 },
    { id: 6, previousId: 5 }
  ]

  t.deepEqual(output, expected)
})

test('should sort items (two chains)', (t) => {
  const input = [
    { id: 1, previousId: null },
    { id: 16, previousId: 15 },
    { id: 14, previousId: 13 },
    { id: 2, previousId: 1 },
    { id: 15, previousId: 14 },
    { id: 3, previousId: 2 }
  ]

  const output = sortItems(input)

  const expected = [
    { id: 1, previousId: null },
    { id: 2, previousId: 1 },
    { id: 3, previousId: 2 },
    { id: 14, previousId: 13 },
    { id: 15, previousId: 14 },
    { id: 16, previousId: 15 }
  ]

  t.deepEqual(output, expected)
})

test('should sort items (three chains)', (t) => {
  const input = [
    { id: 1, previousId: null },
    { id: 116, previousId: 115 },
    { id: 14, previousId: 13 },
    { id: 2, previousId: 1 },
    { id: 115, previousId: 114 },
    { id: 13, previousId: 12 }
  ]

  const output = sortItems(input)

  const expected = [
    { id: 1, previousId: null },
    { id: 2, previousId: 1 },
    { id: 13, previousId: 12 },
    { id: 14, previousId: 13 },
    { id: 115, previousId: 114 },
    { id: 116, previousId: 115 }
  ]

  t.deepEqual(output, expected)
})

test('should sort items (one chain | random ids)', (t) => {
  const input = [
    { id: 9, previousId: 7 },
    { id: 7, previousId: null },
    { id: 3, previousId: 8 },
    { id: 8, previousId: 2 },
    { id: 1, previousId: 3 },
    { id: 2, previousId: 9 }
  ]

  const output = sortItems(input)

  const expected = [
    { id: 7, previousId: null },
    { id: 9, previousId: 7 },
    { id: 2, previousId: 9 },
    { id: 8, previousId: 2 },
    { id: 3, previousId: 8 },
    { id: 1, previousId: 3 }
  ]

  t.deepEqual(output, expected)
})

test('should sort items (two chains | random ids)', (t) => {
  const input = [
    { id: 14, previousId: 15 },
    { id: 2, previousId: 5 },
    { id: 4, previousId: null },
    { id: 1, previousId: 2 },
    { id: 6, previousId: 4 },
    { id: 13, previousId: 14 },
    { id: 3, previousId: 1 },
    { id: 16, previousId: 13 },
    { id: 12, previousId: 11 },
    { id: 15, previousId: null },
    { id: 11, previousId: 16 },
    { id: 5, previousId: 6 }
  ]

  const output = sortItems(input)

  const expected = [
    { id: 4, previousId: null },
    { id: 6, previousId: 4 },
    { id: 5, previousId: 6 },
    { id: 2, previousId: 5 },
    { id: 1, previousId: 2 },
    { id: 3, previousId: 1 },

    { id: 15, previousId: null },
    { id: 14, previousId: 15 },
    { id: 13, previousId: 14 },
    { id: 16, previousId: 13 },
    { id: 11, previousId: 16 },
    { id: 12, previousId: 11 }
  ]

  t.deepEqual(output, expected)
})
