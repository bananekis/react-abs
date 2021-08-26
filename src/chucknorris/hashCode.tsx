// hash function
// inspiration: https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/22429679

export const hashCode = (value: string) => {
  let hash = 0;
  let i = 0;
  let chr = 0;

  if (value.length === 0) return hash;
  for (i = 0; i < value.length; i++) {
    chr = value.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
