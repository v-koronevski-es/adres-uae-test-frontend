import { Column } from '../index';

import * as S from './styles';

import ArrowUp from './Icons/ArrowUp';
import ArrowDown from './Icons/ArrowDown';
import SortArrows from './Icons/SortArrows';

export type HeadProps<Row> = {
  columns: Column<Row>[];
  order: 'asc' | 'desc';
  orderBy: string;
  setOrder: (order: 'asc' | 'desc') => void;
  setOrderBy: (orderBy: string) => void;
};

export const renderSortArrows = (active: boolean, order: 'asc' | 'desc') => {
  if (!active) {
    return <SortArrows />;
  }

  if (order === 'asc') {
    return <ArrowDown />;
  }

  if (order === 'desc') {
    return <ArrowUp />;
  }
};

const Head = <Row extends unknown>({ columns, order, orderBy, setOrder, setOrderBy }: HeadProps<Row>) => {
  const handleOrder = (ord: 'asc' | 'desc', ordBy: string) => {
    setOrder(ord);
    setOrderBy(ordBy);
  };

  return (
    <S.Header>
      {columns.map(column => (
        <S.ColumnBlock key={column.title}>
          {column.title}
          {column.sortable ? (
            <S.OrderButton
              onClick={() =>
                handleOrder(column.accessor === orderBy ? (order === 'asc' ? 'desc' : 'asc') : 'asc', column.accessor)
              }
            >
              {renderSortArrows(column.accessor === orderBy, order)}
            </S.OrderButton>
          ) : null}
        </S.ColumnBlock>
      ))}
    </S.Header>
  );
};

export default Head;
