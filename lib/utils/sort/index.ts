export const sortData = <Row extends { [key: string]: any }>(
  order: 'asc' | 'desc',
  orderBy: string,
  rows: Row[],
  orderFn?: (rowA: Row, rowB: Row) => 0 | 1 | -1,
): Row[] => {
  if (!orderBy) {
    return rows;
  }

  const sorted = [
    ...rows.sort((a, b) => {
      if (orderFn) {
        return order === 'asc' ? orderFn(a, b) : orderFn(a, b) * -1;
      } else if (typeof a[orderBy] === 'string') {
        if (a[orderBy] < b[orderBy]) {
          return order === 'asc' ? -1 : 1;
        }
        if (a[orderBy] > b[orderBy]) {
          return order === 'asc' ? 1 : -1;
        }
        return 0;
      } else if (typeof a[orderBy] === 'number') {
        return order === 'asc' ? a[orderBy] - b[orderBy] : (a[orderBy] - b[orderBy]) * -1;
      }

      return 0;
    }),
  ];

  return sorted;
};
