import { theme } from 'review-me-design-system';
import styled, { css } from 'styled-components';

const MyResumeItemLayout = styled.li`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;

  background-color: ${theme.color.neutral.bg.default};
  border-radius: 1rem;
  box-shadow: 0 0 1.5rem -0.25rem rgba(16, 24, 40, 0.08);

  color: ${theme.color.accent.text.strong};
  ${theme.font.body.default};

  cursor: pointer;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ellipsisStyles = css`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const Title = styled.span`
  ${theme.font.title.default}
  ${ellipsisStyles}
`;

const Occupation = styled.span`
  ${ellipsisStyles}
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid ${theme.color.accent.bd.strong};
  border-radius: 1rem;
`;

const leftButtonStyles = css`
  border-right: 1px solid ${theme.color.accent.bd.strong};
  border-radius: 1rem 0 0 1rem;
`;

const rightButtonStyles = css`
  border-radius: 0 1rem 1rem 0;
`;

const Button = styled.button<{ $position: 'left' | 'right' }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2.75rem;
  ${({ $position }) => ($position === 'left' ? leftButtonStyles : rightButtonStyles)}

  background-color: transparent;

  color: ${theme.color.accent.text.strong};

  cursor: pointer;

  &:hover {
    background-color: ${theme.palette.green100};
  }
`;

export { MyResumeItemLayout, DescriptionContainer, Title, Occupation, ButtonsContainer, Button };
