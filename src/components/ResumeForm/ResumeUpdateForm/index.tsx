import React, { FormEvent } from 'react';
import { Button, Icon, Input, Select } from 'review-me-design-system';
import ButtonGroup from '@components/ButtonGroup';
import PdfViewer from '@components/PdfViewer';
import useMediaQuery from '@hooks/useMediaQuery';
import usePdf from '@hooks/usePdf';
import { Occupation, Scope, useOccupationList, useScopeList } from '@apis/utilApi';
import { Field, FieldContainer, Form, ResumeFormLayout, Label } from '../style';

interface Props {
  resumeId: number;
  file?: string;
  title: string;
  year?: number;
  selectedOccupation?: Occupation;
  selectedScope?: Scope;
  onChangeTitle: (title: string) => void;
  onChangeYear: (year: number) => void;
  onChangeSelectedOccupation: (occupation: Occupation) => void;
  onChangeSelectedScope: (scope: Scope) => void;
  onSubmit: ({
    resumeId,
    title,
    scopeId,
    occupationId,
    year,
  }: {
    resumeId: number;
    title: string;
    scopeId: number;
    occupationId: number;
    year: number;
  }) => void;
}

const ResumeUpdateForm = ({
  resumeId,
  file,
  title,
  year,
  selectedOccupation,
  selectedScope,
  onChangeTitle,
  onChangeYear,
  onChangeSelectedOccupation,
  onChangeSelectedScope,
  onSubmit,
}: Props) => {
  const PDF_BUTTON_ICON_SIZE = 24;

  const { totalPages, scale, zoomIn, zoomOut, setTotalPages } = usePdf({});
  const { matches: isMDevice } = useMediaQuery({ mediaQueryString: '(max-width: 768px)' });

  const { data: occupationList } = useOccupationList();
  const { data: scopeList } = useScopeList();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedOccupation || !selectedScope || title.length === 0 || !year) return;

    onSubmit({
      resumeId,
      title,
      scopeId: selectedScope.id,
      occupationId: selectedOccupation.id,
      year,
    });
  };

  return (
    <ResumeFormLayout>
      <PdfViewer
        showAllPages={true}
        file={file}
        totalPages={totalPages}
        scale={scale}
        onLoadSuccess={setTotalPages}
        width={isMDevice ? '100%' : '55%'}
        height="35rem"
      >
        <ButtonGroup height="2rem">
          <ButtonGroup.Button onClick={zoomIn}>
            <Icon iconName="plus" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
          </ButtonGroup.Button>
          <ButtonGroup.Button onClick={zoomOut}>
            <Icon iconName="minus" width={PDF_BUTTON_ICON_SIZE} height={PDF_BUTTON_ICON_SIZE} />
          </ButtonGroup.Button>
        </ButtonGroup>
      </PdfViewer>

      <Form onSubmit={handleSubmit}>
        <FieldContainer>
          <Field>
            <Label htmlFor="title">제목</Label>
            <Input id="title" name="title" onChange={(e) => onChangeTitle(e.target.value)} />
          </Field>

          <Field>
            <Label htmlFor="scope">공개 범위</Label>
            <Select
              width="100%"
              onSelectOption={(option) => {
                if (option && typeof option.name === 'string' && typeof option.value === 'number')
                  onChangeSelectedScope({ id: option.value, scope: option.name });
              }}
            >
              <Select.TriggerButton height="2.875rem" />
              <Select.OptionList maxHeight="12.5rem">
                {scopeList?.map(({ id, scope }) => {
                  return (
                    <Select.OptionItem key={id} value={id} name={scope}>
                      {scope}
                    </Select.OptionItem>
                  );
                })}
              </Select.OptionList>
            </Select>
          </Field>

          <Field>
            <Label htmlFor="scope">직군</Label>
            <Select
              width="100%"
              onSelectOption={(option) => {
                if (option && typeof option.name === 'string' && typeof option.value === 'number')
                  onChangeSelectedOccupation({ id: option.value, occupation: option.name });
              }}
            >
              <Select.TriggerButton height="2.875rem" />
              <Select.OptionList maxHeight="12.5rem">
                {occupationList?.map(({ id, occupation }) => {
                  return (
                    <Select.OptionItem key={id} value={id} name={occupation}>
                      {occupation}
                    </Select.OptionItem>
                  );
                })}
              </Select.OptionList>
            </Select>
          </Field>

          <Field>
            <Label htmlFor="year">재직 기간</Label>
            <Input
              type="number"
              id="year"
              name="year"
              placeholder="신입일 경우 0 입력"
              min={0}
              onChange={(e) => onChangeYear(e.target.valueAsNumber)}
            />
          </Field>
        </FieldContainer>

        <Button variant="default" size="m">
          수정하기
        </Button>
      </Form>
    </ResumeFormLayout>
  );
};

export default ResumeUpdateForm;
