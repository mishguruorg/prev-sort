import { any } from "sequelize/types/lib/operators";

interface SortOptions<T> {
  getId: (item: T) => unknown;
  getPreviousId: (item: T) => unknown;
}

const prevSort = <T>(items: T[], opts: SortOptions<T>): T[] => {
  const { getId, getPreviousId } = opts;

  // the input is expected to contain one or many linked lists
  // sorting is trivial if we know which items are roots, and which item is the immediate child of each item
  // can construct this info with two passes over the data:
  //  * first pass to build a map of ids to indices
  //  * second pass to build a map (actually an array for efficiency) of indices to immediate child index and indentify the root indices
  // then we sort the root indices by corresponding id so the ids are in increasing order (if possible)
  // then we go through the roots in order and unwind the linked lists defined by the child index array

  const idxsById = buildIdToIndexMap(items, getId);

  const [childIdxs, rootIdxs] = buildChildAndRootIdxs(
    items,
    idxsById,
    getPreviousId
  );

  sortRootIndicesInplace(items, rootIdxs, getId);

  if (rootIdxs.length === 0) {
    throw new Error(
      "no root item found in the collection - at least one item should have no parent!"
    );
  }

  return buildSortedItems(items, childIdxs, rootIdxs);
};

const buildIdToIndexMap = <T>(
  items: T[],
  getId: (item: T) => unknown
): Map<any, number> => {

  const idxsById = new Map<any, number>();

  for (let i = 0; i < items.length; i++) {
    idxsById.set(getId(items[i]), i);
  }

  if (idxsById.size != items.length) {
    throw new Error("duplicate ids found in collection - every item must have a unique id!");
  }

  return idxsById;
};

const buildChildAndRootIdxs = <T>(
  items: T[],
  idxsById: Map<any, number>,
  getPreviousId: (item: T) => unknown
): [number[], number[]] => {

  const childIdxs = Array(items.length).fill(-1);
  const rootIdxs: number[] = [];

  for (let i = 0; i < items.length; i++) {
    const pId = getPreviousId(items[i]);
    const pIdx = idxsById.get(pId);

    if (pIdx === undefined) {
      rootIdxs.push(i);
    } else {
      if (childIdxs[pIdx] !== -1) {
        throw new Error(
          `previous id ${pId} for item ${items[i]} clashes with another item in the collection - every item's previous id must be unique!`
        );
      }

      childIdxs[pIdx] = i;
    }
  }

  return [childIdxs, rootIdxs];
};

const sortRootIndicesInplace = <T>(items: T[], rootIdxs: number[], getId: (item: T) => unknown): void => {
  
  rootIdxs.sort((a, b) => {
    const idA: any = getId(items[a]);
    const idB: any = getId(items[b]);

    return idA < idB
      ? -1
      : idA > idB
        ? 1
        : 0;
  });
}

const buildSortedItems = <T>(
  items: T[],
  childIdxs: number[],
  rootIdxs: number[]
): T[] => {
  
  const sorted = Array<T>(items.length);

  let resultIdx = 0;

  for (let rootIdx of rootIdxs) {
    for (let nodeIdx = rootIdx; nodeIdx !== -1; nodeIdx = childIdxs[nodeIdx]) {
      sorted[resultIdx++] = items[nodeIdx];
    }
  }

  if (resultIdx !== items.length) {
    throw new Error(
      "the whole collection was not able to be sorted - this implies there is a cycle of ids/previous ids somewhere in the collection!"
    );
  }

  return sorted;
};

export default prevSort;
