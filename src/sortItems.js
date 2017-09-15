import createChain from './createChain'
import sortChains from './sortChains'
import linkChain from './linkChain'

import { difference, clone, flatten } from './utils'

const sortItems = (input) => {
  let items = clone(input)
  let chains = []

  while (items.length > 0) {
    const chain = createChain(items)
    chains = linkChain(chain, chains)
    items = difference(items, chain)
  }

  return flatten(sortChains(chains))
}

export default sortItems
