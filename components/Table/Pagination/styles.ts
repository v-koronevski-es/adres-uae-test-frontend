import styled from 'styled-components';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 5px 10px;
  border-bottom: 1px solid #e2e9f3;
`;

export const ButtonBlock = styled.div`
  padding: 7px;
  margin: 2px;
  width: auto;
  cursor: pointer;
  background-color: ${({ isActive }: { isActive: boolean }) => (!isActive ? '#ffffff' : '#e2e9f3')};
  border-radius: 2px;
`;
