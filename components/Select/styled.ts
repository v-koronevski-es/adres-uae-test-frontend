import styled from 'styled-components';

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 1130px;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: 600;
  padding: 2px 0;
  margin: 0 5px;
`;

export const Input = styled.select`
  border: 0;
  background-color: #ffffff;
  color: #333333;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
  margin: 0 5px;

  &:focus {
    border: 1px solid #3d6deb;
  }
`;

export const ErrorText = styled.p`
  color: red;
`;
