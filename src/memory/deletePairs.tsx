// delete non matching pairs in array and keep only matched ones

import { countInArray } from "./countInArray";

export const deleteUnmatchedPairs = (
  pairs: number[],
  array: number[],
  currentValue: number,
  p: number[]
) => {
  if (
    pairs.length % 2 === 0 &&
    pairs.length !== 0 &&
    countInArray(pairs, pairs[pairs.length - 1]) !== 2
  ) {
    let valuesToRemove = [array[array.length - 1], array[array.length - 2]];

    let arr = p.filter(
      (item) => item !== valuesToRemove[0] && item !== valuesToRemove[1]
    );

    return [...arr, currentValue];
  } else return null;
};
