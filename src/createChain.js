import { clone, removeIndex } from './utils'

const createChain = (input) => {
  let items = clone(input)

  let item = items.shift()
  const chain = [item]

  while (true) {
    let match = false
    for (let i = items.length - 1; !match && i >= 0; i -= 1) {
      const nextItem = items[i]
      if (item.previousId === nextItem.id) {
        item = nextItem
        chain.unshift(item)
        items = removeIndex(i, items)
        match = true
      }
    }
    if (!match) {
      break
    }
  }

  return chain
}

export default createChain
