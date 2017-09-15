import test from 'ava'

import { difference } from './utils'

test('difference', (t) => {
  const a = [0, 1, 2, 3, 4]
  const b = [3, 4, 5, 6]
  const output = difference(a, b)
  const expected = [0, 1, 2]
  t.deepEqual(output, expected)
})
