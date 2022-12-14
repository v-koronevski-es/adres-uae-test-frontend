import styled from 'styled-components';

export const Header = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: repeat(auto-fill, ${100 / 6}%);
  padding: 5px 10px;
  border-bottom: 1px solid #e2e9f3;
  font-weight: 600;
`;

export const ColumnBlock = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;
`;

export const OrderButton = styled.div`
  opacity: 0.7;
  cursor: pointer;
  padding-left: 10px;

  :hover {
    opacity: 1;
  }
`;
