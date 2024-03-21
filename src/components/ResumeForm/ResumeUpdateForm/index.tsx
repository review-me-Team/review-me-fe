import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Input } from 'review-me-design-system';
import ButtonGroup from '@components/ButtonGroup';
import PdfViewer from '@components/PdfViewer';
import Select from '@components/Select';
import useMediaQuery from '@hooks/useMediaQuery';
import usePdf from '@hooks/usePdf';
import { useUserContext } from '@contexts/userContext';
import { useUpdateResume } from '@apis/resumeApi';
import { useOccupationList, useScopeList } from '@apis/utilApi';
import { breakPoints } from '@styles/common';
import { ROUTE_PATH } from '@constants';
import { Field, FieldContainer, Form, ResumeFormLayout, Label } from '../style';

interface Props {
  resumeId: number;
  file?: string;
  initTitle: string;
  initOccupationId: number;
  initScopeId: number;
  initYear: number;
}

const ResumeUpdateForm = ({ resumeId, file, initTitle, initOccupationId, initScopeId, initYear }: Props) => {
  const navigate = useNavigate();

  const { data: occupationList } = useOccupationList();
  const { data: scopeList } = useScopeList();

  const { jwt } = useUserContext();

  const [title, setTitle] = useState<string>(initTitle);
  const [occupationId, setOccupationId] = useState<number>(initOccupationId);
  const [scopeId, setScopeId] = useState<number>(initScopeId);
  const [year, setYear] = useState<number>(initYear);

  const { mutate: updateResume } = useUpdateResume();

  const PDF_BUTTON_ICON_SIZE = 24;

  const { totalPages, scale, zoomIn, zoomOut, setTotalPages } = usePdf({});
  const { matches: isMobile } = useMediaQuery({ mediaQueryString: breakPoints.mobile });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jwt || !occupationId || !scopeId || title.length === 0 || year < 0) return;

    updateResume(
      {
        resumeId,
        title,
        scopeId,
        occupationId,
        year,
        jwt,
      },
      {
        onSuccess: () => {
          navigate(`${ROUTE_PATH.RESUME}/${resumeId}`);
        },
      },
    );
  };

  return (
    <ResumeFormLayout>
      <PdfViewer
        showAllPages={true}
        file={file}
        totalPages={totalPages}
        scale={scale}
        onLoadSuccess={setTotalPages}
        width={isMobile ? '100%' : '55%'}
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
