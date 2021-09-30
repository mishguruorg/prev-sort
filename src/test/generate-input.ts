import _ from "lodash";
import randomstring from "randomstring";
import collectSet from "./collect-set";

export const generateUniqueStrings = (n: number, opts: randomstring.GenerateOptions = {}): string[] => {

  const gen = () => randomstring.generate(opts);

  return generateUniqueItems(gen, n);
}

export const generateUniqueItems = <T, >(gen: () => T, n: number): T[] => {
  const items = new Set<T>();

  while (items.size < n) {
    items.add(gen());
  }

  return collectSet(items);
}

export const sortChainsByRootIdInplace = <T, >(chains: T[][], getId: (item: T) => unknown): T[][] => {

  chains.sort(
    (a, b) => {
      
    const idA: any = getId(a[0]);
    const idB: any = getId(b[0]);

    return idA < idB
      ? -1
      : idA > idB
        ? 1
        : 0;
    });

  return chains;
}