import { concat, first, last } from './utils'
import { Item } from './types'

const linkChain = <T>(chain: Item<T>[], chains: Item<T>[][]): Item<T>[][] => {
  const firstItem = first(chain)
  let match = false

  for (let i = 0; i < chains.length; i += 1) {
    const lastItem = last(chains[i])
    if (firstItem.previousId === lastItem.id) {
      chains[i] = concat(chains[i], chain)
      match = true
      break
    }
  }

  if (!match) {
    chains.push(chain)
  }

  return chains
}

export default linkChain
