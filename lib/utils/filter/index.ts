export type FilterColumn = {
  columnAccessor: string;
  filterValue: any;
  isFullMatchFilter?: boolean;
  lessThen?: boolean;
  moreThen?: boolean;
};

export const filterData = <Row extends { [key: string]: any }>(filterState: FilterColumn[], rows: Row[]): Row[] => {
  return rows.filter(row => {
    let accept = true;

    filterState.forEach(filterColumn => {
      if (filterColumn.isFullMatchFilter) {
        if (row[filterColumn.columnAccessor] !== filterColumn.filterValue) {
          accept = false;
        }
      } else {
        if (!row[filterColumn.columnAccessor]) {
          accept = false;
        } else {
          if (
            !row[filterColumn.columnAccessor]
              .toString()
              .toLowerCase()
              .includes(filterColumn.filterValue.toString().toLowerCase())
          ) {
            accept = false;
          }
        }
      }
    });

    return accept;
  });
};
