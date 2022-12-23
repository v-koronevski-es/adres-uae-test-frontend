import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { sortData } from 'lib/utils/sort';
import { filterData, FilterColumn } from 'lib/utils/filter';
import Head from './Head';
import Row from './Row';
import Pagination from './Pagination';

import * as S from './styles';

export type Column<Row> = {
  accessor: string;
  title: string;
  sortable?: boolean;
};

export type TableProps<Row> = {
  columns: Column<Row>[];
  rows: Row[];
  filters?: FilterColumn[];
};

const Table = <Row extends { [key: string]: unknown }>({ columns, rows, filters = [] }: TableProps<Row>) => {
  const router = useRouter();

  //filter
  const filteredData = useMemo(() => filterData(filters, rows), [filters, rows]);

  //sort
  const [order, setOrder] = useState((router.query.order || 'asc') as 'asc' | 'desc');
  const [orderBy, setOrderBy] = useState((router.query.orderBy || '') as string);
  const sortedRows = useMemo(() => sortData(order, orderBy, filteredData), [order, orderBy, filteredData]);

  // pagination
  const [rowsPerPage, setRowsPerPage] = useState(Number(router.query.rowsPerPage) || 10);
  const [page, setPage] = useState(Number(router.query.page) || 0);
  const [cursor, setCursor] = useState([] as Row[]);

  useEffect(() => {
    setCursor(sortedRows.slice(page * rowsPerPage, (page + 1) * rowsPerPage));
  }, [rowsPerPage, page, sortedRows]);

  useEffect(() => {
    setPage(0);
  }, [filters, order, orderBy]);

  useEffect(() => {
    console.log(filters);
    const queryParams = {
      page: `${page}`,
      rowsPerPage: `${rowsPerPage}`,
      filters: JSON.stringify(filters),
      order,
      orderBy,
    };
    if (JSON.stringify(queryParams) !== JSON.stringify(router.query)) {
      router.push({
        pathname: router.pathname,
        query: {
          page,
          rowsPerPage,
          filters: JSON.stringify(filters),
          order,
          orderBy,
        },
      });
    }
  }, [page, rowsPerPage, filters, order, orderBy, router]);

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
