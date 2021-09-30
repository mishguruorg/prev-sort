import test from "ava";
import _ from "lodash";

import prevSort from "./index";
import {
  generateUniqueStrings,
  sortChainsByRootIdInplace,
} from "./test/generate-input";
import { shuffle, shuffleInplace } from "./test/random";
import range from "./test/range";

test("should be able to sort any valid input", (t) => {
  const input = [
    { name: "alpha", after: null },
    { name: "hotel", after: "golf" },
    { name: "foxtrot", after: "echo" },
    { name: "delta", after: "charlie" },
    { name: "bravo", after: "alpha" },
    { name: "charlie", after: "bravo" },
    { name: "golf", after: "foxtrot" },
    { name: "echo", after: "delta" },
  ];

  const output = prevSort(input, {
    getId: (item) => item.name,
    getPreviousId: (item) => item.after,
  });

  const expected = [
    { name: "alpha", after: null },
    { name: "bravo", after: "alpha" },
    { name: "charlie", after: "bravo" },
    { name: "delta", after: "charlie" },
    { name: "echo", after: "delta" },
    { name: "foxtrot", after: "echo" },
    { name: "golf", after: "foxtrot" },
    { name: "hotel", after: "golf" },
  ];

  t.deepEqual(output, expected);
});

test("should fail on input with cycles", (t) => {
  const input = [
    { name: "Alex", id: 3, prevId: 4 },
    { name: "Beverly", id: 4, prevId: 3 },
    { name: "Charles", id: 2, prevId: null },
  ];

  try {
    const output = prevSort(input, {
      getId: (item) => item.id,
      getPreviousId: (item) => item.prevId,
    });
  } catch (err) {
    t.pass();
  }
});

test("should succeed on input with multiple root items", (t) => {
  const input = [
    { name: "Charles", id: 2, prevId: null },
    { name: "Beverly", id: 4, prevId: 3 },
    { name: "Alex", id: 3, prevId: null },
  ];

  const expected = [
    { name: "Charles", id: 2, prevId: null },
    { name: "Alex", id: 3, prevId: null },
    { name: "Beverly", id: 4, prevId: 3 },
  ];

  const output = prevSort(input, {
    getId: (item) => item.id,
    getPreviousId: (item) => item.prevId,
  });

  t.deepEqual(expected, output);
});

test("should fail on input with duplicate ids", (t) => {
  const input = [
    { name: "Alex", id: 2, prevId: 1 },
    { name: "Beverly", id: 2, prevId: 1 },
    { name: "Charles", id: 1, prevId: null },
  ];

  try {
    const output = prevSort(input, {
      getId: (item) => item.id,
      getPreviousId: (item) => item.prevId,
    });
  } catch (err) {
    t.pass();
  }
});

test("should succeed on input where prev id does not exist in collection", (t) => {
  const input = [
    { name: "Alex", id: 3, prevId: 1 },
    { name: "Beverly", id: 2, prevId: 3 },
    { name: "Charles", id: 1, prevId: 4 },
  ];

  const expected = [
    { name: "Charles", id: 1, prevId: 4 },
    { name: "Alex", id: 3, prevId: 1 },
    { name: "Beverly", id: 2, prevId: 3 },
  ];

  const output = prevSort(input, {
    getId: (item) => item.id,
    getPreviousId: (item) => item.prevId,
  });

  t.deepEqual(expected, output);
});

test("should be able to sort any valid input (large random datasets | single chain | many iterations)", (t) => {
  const inputSize = 1000;
  const reps = 100;

  for (let rep = 0; rep < reps; rep++) {
    const strs = generateUniqueStrings(inputSize);

    const expected = range(0, inputSize).map((i) => {
      const id = strs[i];
      const prevId = i === 0 ? null : strs[i - 1];
      return { id, prevId };
    });

    const input = shuffle(expected);

    const output = prevSort(input, {
      getId: (item) => item.id,
      getPreviousId: (item) => item.prevId,
    });

    t.deepEqual(expected, output);
  }
});

test("should order sublists by root id", (t) => {
  const input = [
    { name: "Derek", id: 11, prevId: 10 },
    { name: "Feng", id: 13, prevId: 12 },
    { name: "Evelyn", id: 12, prevId: 11 },

    { name: "Imogen", id: 23, prevId: 22 },
    { name: "Gavin", id: 21, prevId: 20 },
    { name: "Holly", id: 22, prevId: 21 },

    { name: "Beverly", id: 2, prevId: 1 },
    { name: "Alex", id: 1, prevId: 0 },
    { name: "Charles", id: 3, prevId: 2 },
  ];

  const expected = [

    { name: "Alex", id: 1, prevId: 0 },
    { name: "Beverly", id: 2, prevId: 1 },
    { name: "Charles", id: 3, prevId: 2 },

    { name: "Derek", id: 11, prevId: 10 },
    { name: "Evelyn", id: 12, prevId: 11 },
    { name: "Feng", id: 13, prevId: 12 },

    { name: "Gavin", id: 21, prevId: 20 },
    { name: "Holly", id: 22, prevId: 21 },
    { name: "Imogen", id: 23, prevId: 22 },
  ];

  const actual = prevSort(input, {
    getId: (item) => item.id,
    getPreviousId: (item) => item.prevId,
  });

  t.deepEqual(expected, actual);
});

test("should be able to sort any valid input (large random datasets | many chains | many iterations)", (t) => {
  const chainSize = 5;
  const numChains = 5;
  const reps = 1;

  const numItems = chainSize * numChains;

  for (let rep = 0; rep < reps; rep++) {

    const strs = generateUniqueStrings(numItems);
    let strIdx = 0;

    const chains = range(0, numChains).map(() =>
      range(0, chainSize).map((i) => {
        const id = strs[strIdx];
        const prevId = i === 0 ? null : strs[strIdx - 1];
        ++strIdx;
        return { id, prevId };
      })
    );

    sortChainsByRootIdInplace(chains, (item) => item.id);

    const expected = _.flatten(chains);

    const input = shuffle(expected);

    const actual = prevSort(input, {
      getId: (item) => item.id,
      getPreviousId: (item) => item.prevId,
    });

    t.deepEqual(expected, actual);
  }
});
