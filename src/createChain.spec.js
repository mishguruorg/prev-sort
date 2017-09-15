import test from 'ava'

import createChain from './createChain'

test('should create a perfect chain', (t) => {
  const input = [
    { id: 4, previousId: 3 },
    { id: 3, previousId: 2 },
    { id: 2, previousId: 1 },
    { id: 1, previousId: 0 },
    { id: 0, previousId: null }
  ]

  const output = createChain(input)

  const expected = [
    { id: 0, previousId: null },
    { id: 1, previousId: 0 },
    { id: 2, previousId: 1 },
    { id: 3, previousId: 2 },
    { id: 4, previousId: 3 }
  ]

  t.deepEqual(output, expected)
})

test('should create a short chain', (t) => {
  const input = [
    { id: 2, previousId: 1 },
    { id: 3, previousId: 2 },
    { id: 0, previousId: null },
    { id: 4, previousId: 3 },
    { id: 1, previousId: 0 }
  ]

  const output = createChain(input)

  const expected = [
    { id: 0, previousId: null },
    { id: 1, previousId: 0 },
    { id: 2, previousId: 1 }
  ]

  t.deepEqual(output, expected)
})

test('should create a chain with a single item', (t) => {
  const input = [
    { id: 0, previousId: null },
    { id: 2, previousId: 1 },
    { id: 3, previousId: 2 },
    { id: 4, previousId: 3 },
    { id: 1, previousId: 0 }
  ]

  const output = createChain(input)

  const expected = [
    { id: 0, previousId: null }
  ]

  t.deepEqual(output, expected)
})
