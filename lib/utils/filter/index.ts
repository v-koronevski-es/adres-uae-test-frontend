export type FilterColumn = {
  columnAccessor: string;
  filterValue: any;
  isFullMatchFilter?: boolean;
  lessThenDate?: boolean;
  moreThenDate?: boolean;
};

export const filterData = <Row extends { [key: string]: any }>(filterState: FilterColumn[], rows: Row[]): Row[] => {
  return rows.filter(row => {
    let accept = true;

    filterState.forEach(filterColumn => {
      if (filterColumn.lessThenDate || filterColumn.moreThenDate) {
        const filterDate = new Date(filterColumn.filterValue);
        const rowDate = row[filterColumn.columnAccessor] ? new Date(row[filterColumn.columnAccessor]) : null;
        if (!rowDate || (filterColumn.lessThenDate && rowDate > filterDate)) {
          accept = false;
        }

        if (!rowDate || (filterColumn.moreThenDate && rowDate < filterDate)) {
          accept = false;
        }
      } else if (filterColumn.isFullMatchFilter) {
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
