import test from 'ava'

import sortChains from './sortChains'

test('should sort non-contigous chains', (t) => {
  const input = [
    [
      { id: 10, previousId: null },
      { id: 11, previousId: 10 },
      { id: 12, previousId: 11 },
    ],
    [
      { id: 110, previousId: null },
      { id: 111, previousId: 110 },
      { id: 112, previousId: 111 },
    ],
    [
      { id: 0, previousId: null },
      { id: 1, previousId: 0 },
      { id: 2, previousId: 1 },
    ],
  ]

  const actual = sortChains(input)

  const expected = [
    [
      { id: 0, previousId: null },
      { id: 1, previousId: 0 },
      { id: 2, previousId: 1 },
    ],
    [
      { id: 10, previousId: null },
      { id: 11, previousId: 10 },
      { id: 12, previousId: 11 },
    ],
    [
      { id: 110, previousId: null },
      { id: 111, previousId: 110 },
      { id: 112, previousId: 111 },
    ],
  ]

  t.deepEqual(actual, expected)
})
