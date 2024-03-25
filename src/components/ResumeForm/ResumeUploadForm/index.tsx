import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Input } from 'review-me-design-system';
import ButtonGroup from '@components/ButtonGroup';
import PdfViewer from '@components/PdfViewer';
import Select from '@components/Select';
import useMediaQuery from '@hooks/useMediaQuery';
import usePdf from '@hooks/usePdf';
import { useToastContext } from '@contexts/toastContext';
import { useUserContext } from '@contexts/userContext';
import { usePostResume } from '@apis/resumeApi';
import { useOccupationList, useScopeList } from '@apis/utilApi';
import { breakPoints } from '@styles/common';
import { FAILURE_MESSAGE, ROUTE_PATH, SUCCESS_MESSAGE } from '@constants';
import { validateFileName, validateTitle, validateYear } from '@utils';
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

  const { openToast } = useToastContext();
  const { mutate: addResume } = usePostResume();

  const { totalPages, scale, zoomIn, zoomOut, setTotalPages } = usePdf({});
  const { matches: isMobile } = useMediaQuery({ mediaQueryString: breakPoints.mobile });

  const { data: occupationList } = useOccupationList();
  const { data: scopeList } = useScopeList();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) setFile(files[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!jwt) return;

    if (!file) {
      openToast({ type: 'error', message: FAILURE_MESSAGE.RESUME.NOT_SELECTED_FILE });
      return;
    }

    if (!validateFileName(file)) {
      openToast({ type: 'error', message: FAILURE_MESSAGE.RESUME.LIMITED_FILE_NAME });
      return;
    }

    if (!validateTitle(title)) {
      openToast({ type: 'error', message: FAILURE_MESSAGE.RESUME.EMPTY_TITLE });
      return;
    }

    if (!scopeId) {
      openToast({ type: 'error', message: FAILURE_MESSAGE.RESUME.NOT_SELECTED_SCOPE });
      return;
    }

    if (!occupationId) {
      openToast({ type: 'error', message: FAILURE_MESSAGE.RESUME.NOT_SELECTED_OCCUPATION });
      return;
    }

    if (!(year && validateYear(year))) {
      openToast({ type: 'error', message: FAILURE_MESSAGE.RESUME.INVALID_YEAR });
      return;
    }

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
          openToast({ type: 'success', message: SUCCESS_MESSAGE.UPLOAD_RESUME });
        },
      },
    );
  };

  return (
    <ResumeFormLayout>
      {isMobile && (
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
          {!isMobile && (
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
            <Input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value.trim())} />
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
            <Label htmlFor="year">경력</Label>
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

        <Button type="submit" variant="default" size="m">
          올리기
        </Button>
      </Form>
    </ResumeFormLayout>
  );
};

export default ResumeUploadForm;
