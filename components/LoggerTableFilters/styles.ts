import styled from 'styled-components';

export const FormWrapper = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #3d6deb;
  border: 0;
  padding: 5px;
  width: 100%;
  border-radius: 5px;
  color: #ffffff;
  margin: 0 10px;
  margin-top: -10px;

  :active {
    opacity: 0.7;
  }
`;
