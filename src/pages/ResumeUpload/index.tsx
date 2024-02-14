import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Button, Icon, Input, Select } from 'review-me-design-system';
import PdfViewer from '@components/PdfViewer';
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
  const [file, setFile] = useState<File | undefined>();
  const [numPages, setNumPages] = useState<number>(1);

  const [, setSelectedOccupation] = useState<Occupation | undefined>();
  const [, setSelectedScope] = useState<Scope | undefined>();

  const { data: occupationList } = useOccupationList();
  const { data: scopeList } = useScopeList();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files && files[0]) setFile(files[0]);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <PageMain>
      <IconButton>
        <Icon iconName="leftArrow" />
        <span>뒤로</span>
      </IconButton>

      <ResumeUploadContainer>
        <Description>
          <MainDescription>이력서 pdf를 올려주세요</MainDescription>
          <SubDescription>제출된 이력서 pdf 파일은 변경이 불가합니다.</SubDescription>
        </Description>

        <ResumeUploadFormContainer>
          <PdfViewer
            showAllPages={true}
            file={file}
            numPages={numPages}
            onLoadSuccess={setNumPages}
            width="55%"
            height="35rem"
          />

          <ResumeUploadForm onSubmit={handleSubmit}>
            <FieldContainer>
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

              <Field>
                <Label htmlFor="title">제목</Label>
                <Input id="title" name="title" />
              </Field>

              <Field>
                <Label htmlFor="scope">공개 범위</Label>
                <Select
                  width="100%"
                  onSelectOption={(option) => {
                    if (option && typeof option.name === 'number' && typeof option.value === 'string')
                      setSelectedScope({ id: option.name, scope: option.value });
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
                    if (option && typeof option.name === 'number' && typeof option.value === 'string')
                      setSelectedOccupation({ id: option.name, occupation: option.value });
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
                <Input type="number" id="year" name="year" placeholder="신입일 경우 0 입력" min={0} />
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
