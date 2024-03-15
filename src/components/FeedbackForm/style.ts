import styled from 'styled-components';

const FeedbackFormLayout = styled.form<{ $type: 'add' | 'edit' }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  ${({ $type }) => $type === 'add' && 'padding: 0.75rem 1rem;'}

  ${({ $type }) => $type === 'add' && 'box-shadow: rgba(0, 0, 0, 0.07) 0 0 1.25rem'};
`;

const LabelList = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const ButtonWrapper = styled.div<{ $type: 'add' | 'edit' }>`
  display: flex;
  justify-content: flex-end;
  ${({ $type }) => $type === 'edit' && 'gap: 0.5rem;'}
  width: 100%;
`;

export { FeedbackFormLayout, LabelList, ButtonWrapper };
