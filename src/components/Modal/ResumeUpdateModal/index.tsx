import React, { FormEvent, useState } from 'react';
import { Button, Input, Modal, Select } from 'review-me-design-system';
import PdfViewer from '@components/PdfViewer';
import { Description, Field, Label, Form, ButtonContainer } from './style';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

interface Scope {
  id: string | number;
  scope: string;
}
interface Occupation {
  id: string | number;
  occupation: string;
}

const scopeList = [
  {
    id: '1',
    scope: '전체 공개',
  },
  {
    id: '2',
    scope: '비공개',
  },
  {
    id: '3',
    scope: '친구만 공개',
  },
];
const occupations = [
  {
    id: 1,
    occupation: 'Frontend',
  },
  {
    id: 2,
    occupation: 'Backend',
  },
  {
    id: 3,
    occupation: 'Android',
  },
  {
    id: 4,
    occupation: 'iOS',
  },
  {
    id: 5,
    occupation: 'AI/ML',
  },
  {
    id: 6,
    occupation: 'Data Analyst',
  },
  {
    id: 7,
    occupation: 'Data Engineering',
  },
  {
    id: 8,
    occupation: 'DBA',
  },
  {
    id: 9,
    occupation: 'DevOps',
  },
  {
    id: 10,
    occupation: 'System Engineer',
  },
  {
    id: 11,
    occupation: 'Network Engineer',
  },
  {
    id: 12,
    occupation: 'Embedded SW',
  },
  {
    id: 13,
    occupation: 'Graphics',
  },
  {
    id: 14,
    occupation: 'Hardware',
  },
  {
    id: 15,
    occupation: 'Infra Engineering',
  },
  {
    id: 16,
    occupation: 'Security',
  },
  {
    id: 17,
    occupation: 'Block Chain',
  },
];

const ResumeUpdateModal = ({ isOpen, onClose }: Props) => {
  const [selectedScope, setSelectedScope] = useState<Scope | undefined>();
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation | undefined>();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Modal modalRootId="modal-root" isOpen={isOpen} onClose={onClose} width="24.5rem">
      <Description>
        <Modal.Title>이력서 pdf를 수정해주세요</Modal.Title>
      </Description>

      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="title">제목</Label>
          <Input id="title" name="title" />
        </Field>

        <Field>
          <Label htmlFor="scope">공개 범위</Label>
          <Select
            defaultOption={{ value: scopeList[0].id, label: scopeList[0].scope }}
            onSelectOption={(option) => {
              if (option && typeof option.label === 'string')
                setSelectedScope({ id: option.value, scope: option.label });
            }}
          >
            <Select.TriggerButton />
            <Select.OptionList>
              {scopeList.map(({ id, scope }) => {
                return (
                  <Select.OptionItem key={id} value={id} label={scope}>
                    {scope}
                  </Select.OptionItem>
                );
              })}
            </Select.OptionList>
          </Select>
        </Field>

        <Field>
          <Label htmlFor="occupation">직군</Label>
          <Select
            onSelectOption={(option) => {
              if (option && typeof option.label === 'string')
                setSelectedOccupation({ id: option.value, occupation: option.label });
            }}
          >
            <Select.TriggerButton />
            <Select.OptionList maxHeight="8.25rem">
              {occupations.map(({ id, occupation }) => {
                return (
                  <Select.OptionItem key={id} value={id} label={occupation}>
                    {occupation}
                  </Select.OptionItem>
                );
              })}
            </Select.OptionList>
          </Select>
        </Field>

        <Field>
          <Label htmlFor="year">재직 기간</Label>
          <Input type="number" id="year" name="year" placeholder="신입일 경우 0 입력" min={0} />
        </Field>

        <ButtonContainer>
          <Button variant="outline" size="m" onClick={onClose} width="36%">
            취소
          </Button>
          <Button variant="default" size="m" width="36%">
            수정
          </Button>
        </ButtonContainer>
      </Form>
    </Modal>
  );
};

export default ResumeUpdateModal;
