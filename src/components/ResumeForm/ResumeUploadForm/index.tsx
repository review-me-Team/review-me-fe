import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Input } from 'review-me-design-system';
import ButtonGroup from '@components/ButtonGroup';
import PdfViewer from '@components/PdfViewer';
import Select from '@components/Select';
import useMediaQuery from '@hooks/useMediaQuery';
import usePdf from '@hooks/usePdf';
import { useUserContext } from '@contexts/userContext';
import { usePostResume } from '@apis/resumeApi';
import { useOccupationList, useScopeList } from '@apis/utilApi';
import { ROUTE_PATH } from '@constants';
import { Field, FieldContainer, FileLabel, Form, ResumeFormLayout, Label } from '../style';

const ResumeUploadForm = () => {
  const navigate = useNavigate();
  const PDF_BUTTON_ICON_SIZE = 24;
  const { jwt } = useUserContext();

  const [file, setFile] = useState<File | undefined>();
  const [title, setTitle] = useState<string>('');
  const [occupationId, setOccupationId] = useState<number | undefined>();
  const [scopeId, setScopeId] = useState<number | undefined>();
  const [year, setYear] = useState<number | undefined>();
  const { mutate: addResume } = usePostResume();

  const { totalPages, scale, zoomIn, zoomOut, setTotalPages } = usePdf({});
  const { matches: isMDevice } = useMediaQuery({ mediaQueryString: '(max-width: 768px)' });

  const { data: occupationList } = useOccupationList();
  const { data: scopeList } = useScopeList();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) setFile(files[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jwt || !file || !occupationId || !scopeId || title.length === 0 || !year) return;

    addResume(
      {
        title,
        pdf: file,
        scopeId,
        occupationId,
        year,
        jwt,
      },
      {
        onSuccess: (data) => {
          const { id } = data;
          navigate(`${ROUTE_PATH.RESUME}/${id}`);
        },
      },
    );
  };

  return (
    <ResumeFormLayout>
      {isMDevice && (
        <Field>
          <FileLabel htmlFor="file">파일 선택</FileLabel>
          <input
            type="file"
            id="file"
            name="file"
            accept=".pdf"
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
        </Field>
      )}

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
          {!isMDevice && (
            <Field>
              <FileLabel htmlFor="file">파일 선택</FileLabel>
              <input
                type="file"
                id="file"
                name="file"
                accept=".pdf"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </Field>
          )}

          <Field>
            <Label htmlFor="title">제목</Label>
            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          </Field>

          <Field>
            <Label htmlFor="scope">공개 범위</Label>
            <Select
              id="scope"
              name="scope"
              defaultValue={'none'}
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
              defaultValue={'none'}
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
          올리기
        </Button>
      </Form>
    </ResumeFormLayout>
  );
};

export default ResumeUploadForm;
