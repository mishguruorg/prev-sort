import test from 'ava'

import prevSort from './index'

test('should be able to sort anything', (t) => {
  const input = [
    { name: 'alpha', after: null },
    { name: 'hotel', after: 'golf' },
    { name: 'foxtrot', after: 'echo' },
    { name: 'delta', after: 'charlie' },
    { name: 'bravo', after: 'alpha' },
    { name: 'charlie', after: 'bravo' },
    { name: 'golf', after: 'foxtrot' },
    { name: 'echo', after: 'delta' }
  ]

  const output = prevSort(input, {
    getId: (item) => item.name,
    getPreviousId: (item) => item.after
  })

  const expected = [
    { name: 'alpha', after: null },
    { name: 'bravo', after: 'alpha' },
    { name: 'charlie', after: 'bravo' },
    { name: 'delta', after: 'charlie' },
    { name: 'echo', after: 'delta' },
    { name: 'foxtrot', after: 'echo' },
    { name: 'golf', after: 'foxtrot' },
    { name: 'hotel', after: 'golf' }
  ]

  t.deepEqual(output, expected)
})
