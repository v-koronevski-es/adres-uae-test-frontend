import { Column } from '../index';

import * as S from './styles';

export type RowProps<Row> = {
  columns: Column<Row>[];
  row: Row;
};

const Row = <Row extends { [key: string]: any }>({ columns, row }: RowProps<Row>) => {
  return (
    <S.Row>
      {columns.map(column => (
        <S.ColumnBlock key={column.accessor + row[column.accessor]}>
          {column.accessor ? row[column.accessor] : ''}
        </S.ColumnBlock>
      ))}
    </S.Row>
  );
};

export default Row;
