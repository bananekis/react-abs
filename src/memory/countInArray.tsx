// get count of specific value in array

export const countInArray = (array: number[], searchedValue: number) => {
  return array.filter((item) => searchedValue === item).length;
};
