# Prev Sort

> Sort a collection based on each item knowing the item before it

## Installation

```shell
npm install --save prev-sort
```

## Usage

```javascript
import prevSort from 'prev-sort'

const array = [
  { id: 4, previousId: 3 },
  { id: 2, previousId: 1 },
  { id: 3, previousId: 2 },
  { id: 1, previousId: null },
]

const sortedArray = prevSort(array, {
  getId: (item) => item.id,
  getPreviousId: (item) => item.previousId,
})

/*
[
  { id: 1, previousId: null },
  { id: 2, previousId: 1 },
  { id: 3, previousId: 2 },
  { id: 4, previousId: 3 },
]
*/
```
