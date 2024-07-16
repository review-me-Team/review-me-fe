import { theme } from 'review-me-design-system';
import styled from 'styled-components';

const EmojiModalWrapper = styled.div`
  display: none;
  padding: 0.5rem;
  gap: 0.25rem;
  position: absolute;
  left: -0.75rem;
  top: auto;
  bottom: 100%;
  z-index: ${theme.zIndex.floating};

  background-color: ${theme.color.neutral.bg.default};
  border-radius: 1rem;
  box-shadow: 0 0 0.625rem 0 rgba(0, 0, 0, 0.25);

  &.active {
    display: flex;
  }
`;

const EmojiButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: 1.5rem;
  flex-shrink: 0;

  background-color: ${theme.palette.gray300};
  border-radius: 50%;

  & > svg {
    fill: ${theme.palette.gray600};
  }

  cursor: pointer;

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

const EmojiModalLayout = styled.div`
  position: relative;
`;

export { EmojiModalWrapper, EmojiButton, EmojiModalLayout };
