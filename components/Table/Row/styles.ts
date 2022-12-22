import styled from 'styled-components';

export const Row = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fill, ${100 / 6}%);
  padding: 0 10px;
  border-bottom: 1px solid #e2e9f3;
`;

export const ColumnBlock = styled.div`
  padding: 10px;
`;
