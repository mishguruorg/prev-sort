import test from "ava";
import range from "./range";

test("range produces expected output", (t) => {

  const expected = [7, 8, 9];

  const output = range(7, 3);

  t.deepEqual(expected, output);
});