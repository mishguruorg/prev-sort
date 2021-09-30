import iterForEach from "./iter-for-each";

const collectSet = <T, >(items: Set<T>): T[] => {
  const result: T[] = [];

  iterForEach(([item, _]) => result.push(item), items.entries());

  return result;
}

export default collectSet;