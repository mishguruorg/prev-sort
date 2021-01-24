import createChain from './createChain'
import sortChains from './sortChains'
import linkChain from './linkChain'

import { difference, clone, flatten } from './utils'
import { Item } from './types'

const sortItems = <T>(input: Item<T>[]): Item<T>[] => {
  let items = clone(input)
  let chains: Item<T>[][] = []

  while (items.length > 0) {
    const chain = createChain(items)
    chains = linkChain(chain, chains)
    items = difference(items, chain)
  }

  return flatten(sortChains(chains))
}

export default sortItems
