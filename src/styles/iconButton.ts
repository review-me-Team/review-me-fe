import styled from 'styled-components';

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;

  background-color: transparent;

  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
  }
`;

export { IconButton };
