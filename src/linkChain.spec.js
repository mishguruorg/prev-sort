import test from 'ava'

import linkChain from './linkChain'

test('should link chains', (t) => {
  const chains = [
    [
      { id: 0, previousId: null },
      { id: 1, previousId: 0 },
      { id: 2, previousId: 1 }
    ]
  ]

  const chain = [
    { id: 3, previousId: 2 },
    { id: 4, previousId: 3 },
    { id: 5, previousId: 4 }
  ]

  const output = linkChain(chain, chains)

  const expected = [
    [
      { id: 0, previousId: null },
      { id: 1, previousId: 0 },
      { id: 2, previousId: 1 },
      { id: 3, previousId: 2 },
      { id: 4, previousId: 3 },
      { id: 5, previousId: 4 }
    ]
  ]

  t.deepEqual(output, expected)
})
