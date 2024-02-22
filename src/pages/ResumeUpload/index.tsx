import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Icon, Input, Select } from 'review-me-design-system';
import ButtonGroup from '@components/ButtonGroup';
import PdfViewer from '@components/PdfViewer';
import useMediaQuery from '@hooks/useMediaQuery';
import usePdf from '@hooks/usePdf';
import { usePostResume } from '@apis/resumeApi';
import { Occupation, Scope, useOccupationList, useScopeList } from '@apis/utilApi';
import { PageMain } from '@styles/common';
import {
  ResumeUploadContainer,
  IconButton,
  Description,
  MainDescription,
  SubDescription,
  Field,
  Label,
  FileLabel,
  ResumeUploadForm,
  FieldContainer,
  ResumeUploadFormContainer,
} from './style';

const ResumeUpload = () => {
  const navigate = useNavigate();

  const PDF_BUTTON_ICON_SIZE = 24;
  const { numPages, scale, zoomIn, zoomOut, setNumPages } = usePdf({});

  const { matches: isMDevice } = useMediaQuery({ mediaQueryString: '(max-width: 768px)' });

  const [file, setFile] = useState<File | undefined>();
  const [title, setTitle] = useState<string>('');
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation | undefined>();
  const [selectedScope, setSelectedScope] = useState<Scope | undefined>();
  const [year, setYear] = useState<number | undefined>();
  const { mutate } = usePostResume();

  const { data: occupationList } = useOccupationList();
  const { data: scopeList } = useScopeList();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) setFile(files[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file || !selectedOccupation || !selectedScope || title.length === 0 || !year) return;

    mutate({
      title,
      pdf: file,
      scopeId: selectedScope.id,
      occupationId: selectedOccupation.id,
      year,
    });
  };

  return (
    <PageMain>
      <IconButton onClick={() => navigate(-1)}>
        <Icon iconName="leftArrow" />
        <span>뒤로</span>
      </IconButton>

      <ResumeUploadContainer>
        <Description>
          <MainDescription>이력서 pdf를 올려주세요</MainDescription>
          <SubDescription>제출된 이력서 pdf 파일은 변경이 불가합니다.</SubDescription>
        </Description>

        <ResumeUploadFormContainer>
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
            numPages={numPages}
            scale={scale}
            onLoadSuccess={setNumPages}
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

          <ResumeUploadForm onSubmit={handleSubmit}>
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
                <Input id="title" name="title" onChange={(e) => setTitle(e.target.value)} />
              </Field>

              <Field>
                <Label htmlFor="scope">공개 범위</Label>
                <Select
                  width="100%"
                  onSelectOption={(option) => {
                    if (option && typeof option.name === 'string' && typeof option.value === 'number')
                      setSelectedScope({ id: option.value, scope: option.name });
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
                      setSelectedOccupation({ id: option.value, occupation: option.name });
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
                  onChange={(e) => setYear(e.target.valueAsNumber)}
                />
              </Field>
            </FieldContainer>

            <Button variant="default" size="m">
              올리기
            </Button>
          </ResumeUploadForm>
        </ResumeUploadFormContainer>
      </ResumeUploadContainer>
    </PageMain>
  );
};

export default ResumeUpload;
