import { first, last } from './utils'
import { Item } from './types'

const sortChains = <T>(chains: Item<T>[][]): Item<T>[][] => {
  return chains.sort((a, b) => {
    if (first(a).id > last(b).id) {
      return 1
    }
    if (last(a).id < first(b).id) {
      return -1
    }
    return 0
  })
}

export default sortChains
