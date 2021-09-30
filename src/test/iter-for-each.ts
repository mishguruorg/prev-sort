const iterForEach = <T, >(f: (item: T) => void, iter: IterableIterator<T>): void => {
  for (let item = iter.next(); !item.done; item = iter.next()) {
    f(item.value);
  }
}

export default iterForEach;