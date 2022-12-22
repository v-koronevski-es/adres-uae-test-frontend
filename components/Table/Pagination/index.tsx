import { useState, useEffect } from 'react';

import { PaginationButton } from 'lib/types/table';
import { getPaginationButtons } from 'lib/utils/pagination';
import * as S from './styles';

export type PaginationProps = {
  total: number;
  page: number;
  rowsPerPage: number;
  setPage: (page: number) => void;
  setRowsPerPage: (page: number) => void;
};

const Pagination = ({ total, page, rowsPerPage, setPage, setRowsPerPage }: PaginationProps) => {
  const [pagesCount, setPagesCount] = useState(4); //Math.ceil(total / rowsPerPage));

  useEffect(() => {
    setPagesCount(Math.ceil(total / rowsPerPage));
  }, [total, rowsPerPage]);

  return (
    <S.Row>
      {getPaginationButtons(pagesCount, page).map(button => (
        <S.ButtonBlock
          key={button.key}
          isActive={button.label === page + 1}
          onClick={() => (button.goTo || button.goTo === 0 ? setPage(button.goTo) : null)}
        >
          {button.label}
        </S.ButtonBlock>
      ))}
    </S.Row>
  );
};

export default Pagination;
