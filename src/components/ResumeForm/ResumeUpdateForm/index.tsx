import React, { FormEvent, useState } from 'react';
import { Button, Icon, Input } from 'review-me-design-system';
import ButtonGroup from '@components/ButtonGroup';
import PdfViewer from '@components/PdfViewer';
import Select from '@components/Select';
import useMediaQuery from '@hooks/useMediaQuery';
import usePdf from '@hooks/usePdf';
import { useUpdateResume } from '@apis/resumeApi';
import { useOccupationList, useScopeList } from '@apis/utilApi';
import { Field, FieldContainer, Form, ResumeFormLayout, Label } from '../style';

interface Props {
  resumeId: number;
  file?: string;
  initTitle: string;
  initOccupation: string;
  initScope: string;
  initYear: number;
}

const ResumeUpdateForm = ({ resumeId, file, initTitle, initOccupation, initScope, initYear }: Props) => {
  const { data: occupationList } = useOccupationList();
  const { data: scopeList } = useScopeList();

  const initOccupationId = occupationList?.find(({ occupation }) => occupation === initOccupation)?.id;
  const initScopeId = scopeList?.find(({ scope }) => scope === initScope)?.id;

  const [title, setTitle] = useState<string>(initTitle);
  const [occupationId, setOccupationId] = useState<number | undefined>(initOccupationId);
  const [scopeId, setScopeId] = useState<number | undefined>(initScopeId);
  const [year, setYear] = useState<number | undefined>(initYear);

  const { mutate: updateResume } = useUpdateResume();

  const PDF_BUTTON_ICON_SIZE = 24;

  const { totalPages, scale, zoomIn, zoomOut, setTotalPages } = usePdf({});
  const { matches: isMDevice } = useMediaQuery({ mediaQueryString: '(max-width: 768px)' });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!occupationId || !scopeId || title.length === 0 || !year) return;

    updateResume({
      resumeId,
      title,
      scopeId,
      occupationId,
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
            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>

          <Field>
            <Label htmlFor="scope">공개 범위</Label>
            <Select
              id="scope"
              name="scope"
              defaultValue={scopeId}
              onChange={(e) => {
                if (e.target.value === 'none') {
                  setScopeId(undefined);
                  return;
                }

                const value = Number(e.target.value);
                if (Number.isNaN(value)) return;

                setScopeId(value);
              }}
            >
              <option value="none" disabled />
              {scopeList?.map(({ id, scope }) => {
                return (
                  <option key={id} value={id}>
                    {scope}
                  </option>
                );
              })}
            </Select>
          </Field>

          <Field>
            <Label htmlFor="occupation">직군</Label>
            <Select
              id="occupation"
              name="occupation"
              defaultValue={occupationId}
              onChange={(e) => {
                if (e.target.value === 'none') {
                  setOccupationId(undefined);
                  return;
                }

                const value = Number(e.target.value);
                if (Number.isNaN(value)) return;

                setOccupationId(value);
              }}
            >
              <option value="none" disabled />
              {occupationList?.map(({ id, occupation }) => {
                return (
                  <option key={id} value={id}>
                    {occupation}
                  </option>
                );
              })}
            </Select>
          </Field>

          <Field>
            <Label htmlFor="year">재직 기간</Label>
            <Input
              type="number"
              id="year"
              name="year"
              placeholder="신입일 경우 0 입력"
              value={year}
              min={0}
              onChange={(e) => setYear(e.target.valueAsNumber)}
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
