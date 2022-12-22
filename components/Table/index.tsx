import { useState, useEffect, useMemo } from 'react';

import Head from './Head';
import Row from './Row';
import Pagination from './Pagination';

import * as S from './styles';

export type Column<Row> = {
  accessor: string;
  accessorFn?: (row: Row) => string;
  title: string;
  sortable?: boolean;
};

export type TableProps<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  filters?: FilterColumn[];
};

export type FilterColumn = {
  columnAccessor: string;
  filterValue: any;
  isFullMatchFilter?: boolean;
};

const sortData = <Row extends { [key: string]: any }>(
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

const filterData = <Row extends { [key: string]: any }>(filterState: FilterColumn[], rows: Row[]): Row[] => {
  return rows.filter(row => {
    let accept = true;

    filterState.forEach(filterColumn => {
      if (filterColumn.isFullMatchFilter) {
        if (row[filterColumn.columnAccessor] !== filterColumn.filterValue) {
          accept = false;
        }
      } else {
        if (!JSON.stringify(row[filterColumn.columnAccessor]).includes(JSON.stringify(filterColumn.filterValue))) {
          accept = false;
        }
      }
    });

    return accept;
  });
};

const Table = <Row extends { [key: string]: unknown }>({ columns, rows, filters = [] }: TableProps<Row>) => {
  //filter
  const [filterState] = useState(filters);
  const filteredData = useMemo(() => filterData(filterState, rows), [filterState, rows]);

  //sort
  const [order, setOrder] = useState('asc' as 'asc' | 'desc');
  const [orderBy, setOrderBy] = useState('actionType');
  const sortedRows = useMemo(() => sortData(order, orderBy, filteredData), [order, orderBy, filteredData]);

  // pagination
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [cursor, setCursor] = useState([] as Row[]);

  useEffect(() => {
    setCursor(sortedRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
  }, [rowsPerPage, page, sortedRows]);

  return (
    <S.Table>
      <Head columns={columns} order={order} orderBy={orderBy} setOrder={setOrder} setOrderBy={setOrderBy} />
      {cursor.map((row, index) => (
        <Row key={`row-${index}-${Date.now()}`} columns={columns} row={row} />
      ))}
      <Pagination
        rowsPerPage={rowsPerPage}
        page={page}
        total={sortedRows.length}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
    </S.Table>
  );
};

export default Table;
