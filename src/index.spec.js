import test from 'ava'

import prevSort from './index'

test('should be able to sort anything', (t) => {
  const input = [
    { name: 'george', friend: 'jacob' },
    { name: 'jacob', friend: 'ivan' },
    { name: 'ivan', friend: 'cj' },
    { name: 'cj', friend: 'ashok' },
    { name: 'ashok', friend: 'lucy-jane' },
    { name: 'lucy-jane', friend: 'brendon' },
    { name: 'bredon', friend: 'mo' },
    { name: 'mo', friend: null }
  ]

  const output = prevSort(input, {
    getId: (item) => item.name,
    getPreviousId: (item) => item.friend
  })

  const expected = [
    { name: 'mo', friend: null },
    { name: 'bredon', friend: 'mo' },
    { name: 'lucy-jane', friend: 'brendon' },
    { name: 'ashok', friend: 'lucy-jane' },
    { name: 'cj', friend: 'ashok' },
    { name: 'ivan', friend: 'cj' },
    { name: 'jacob', friend: 'ivan' },
    { name: 'george', friend: 'jacob' }
  ]

  t.deepEqual(output, expected)
})
