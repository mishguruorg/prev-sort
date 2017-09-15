import sortItems from './sortItems'

const prevSort = (items, options) => {
  const { getId, getPreviousId } = options
  console.assert(typeof getId === 'function', 'options.getId must be a functin')
  console.assert(typeof getPreviousId === 'function', 'options.getPreviousId must be a functin')

  const sortableItems = items.map((item) => ({
    id: getId(item),
    previousId: getPreviousId(item),
    value: item
  }))

  const sortedItems = sortItems(sortableItems)

  const values = sortedItems.map((item) => item.value)

  return values
}

export default prevSort
