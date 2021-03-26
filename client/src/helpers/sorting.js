const numSort = (a, b, descending = false) => (descending ? b - a : a - b);

const stringSort = (a, b, descending = false) => {
  if (!a && b) return descending ? 1 : -1;
  if (a && !b) return descending ? -1 : 1;
  if (!a && !b) return 0;
  if (a.toLowerCase() < b.toLowerCase()) return descending ? 1 : -1;
  if (a.toLowerCase() > b.toLowerCase()) return descending ? -1 : 1;
  return 0;
};

const nullSort = (a, b, descending = false) => 0;

const multipleSort = (arr, [...sorts]) => {
  const temp = [...arr];

  [...sorts].reverse().forEach((sort) => {
    temp.sort((a, b) =>
      sort.sortFunction(a[sort.field], b[sort.field], sort.descending)
    );
  });

  return temp;
};

export { numSort, stringSort, nullSort, multipleSort };
