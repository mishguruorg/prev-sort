import test from "ava";
import { generateUniqueStrings } from "../test/generate-input";
import iterForEach from "./iter-for-each";
import { randomInteger, shuffle, shuffleInplace } from "./random";
import range from "./range";

const setContentsEqual = <T>(lhs: Set<T>, rhs: Set<T>): boolean => {
  if (lhs.size !== rhs.size) {
    return false;
  }

  const iter = lhs.values();

  let foundAllKeys = true;

  iterForEach((key) => {
    if (!rhs.has(key)) {
      foundAllKeys = false;
    }
  }, lhs.values());

  return foundAllKeys;
};

test("randomInteger conforms to stated bounds (range of size 1)", (t) => {
  const gen = () => randomInteger(4, 5);

  const outputLength = 100000;

  const expected: number[] = Array(outputLength).fill(4);

  const output = range(0, outputLength).map(gen);

  t.deepEqual(expected, output);
});

test("randomInteger conforms to stated bounds (range of size 100)", (t) => {
  const rangeStart = 1000000000;
  const rangeEnd = rangeStart + 100;

  const gen = () => randomInteger(rangeStart, rangeEnd);

  const outputLength = 10000;

  const output = range(0, outputLength).map(gen);

  for (let x of output) {
    t.assert(rangeStart <= x && x < rangeEnd);
  }
});

test("randomInteger fails for l === r", (t) => {
  try {
    randomInteger(55, 55);
  } catch {
    t.pass();
  }
});

test("randomInteger fails for l > r", (t) => {
  try {
    randomInteger(107, 106);
    t.fail();
  } catch {}

  try {
    randomInteger(55, 2);
    t.fail();
  } catch {}

  try {
    randomInteger(3, -3);
    t.fail();
  } catch {}

  t.pass();
});

test("shuffleInplace retains original items", (t) => {
  const input = generateUniqueStrings(1000);

  const expected = new Set();
  input.forEach((s) => expected.add(s));

  shuffleInplace(input);

  const output = new Set();
  input.forEach((s) => output.add(s));

  t.assert(setContentsEqual(expected, output));
});

test("shuffle retains original items", (t) => {
  const input = generateUniqueStrings(1000);

  const expected = new Set();
  input.forEach((s) => expected.add(s));

  const shuffled = shuffle(input);

  const output = new Set();
  shuffled.forEach((s) => output.add(s));

  t.assert(setContentsEqual(expected, output));
});

test("shuffle does not affect input", (t) => {
  const input = generateUniqueStrings(1000);

  const expected = [...input];

  shuffle(input);

  t.deepEqual(expected, input);
});
