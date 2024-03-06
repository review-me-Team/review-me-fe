import React, { useState } from 'react';
import { Button, Select } from 'review-me-design-system';
import ResumeItem from '@components/ResumeItem';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { useResumeList } from '@apis/resumeApi';
import { Occupation, useOccupationList } from '@apis/utilApi';
import { Filter, FilterContainer, Main, MainHeader, ResumeList } from './style';

const Resume = () => {
  const yearOptions = [
    { value: 0, label: '신입' },
    { value: 1, label: '1 ~ 3년차' },
    { value: 2, label: '4 ~ 6년차' },
    { value: 3, label: '7 ~ 9년차' },
    { value: 4, label: '10년차 이상' },
  ];
  const [, setSelectedOccupation] = useState<Occupation | undefined>();

  const { data: occupationList } = useOccupationList();
  const { data: resumeListData, fetchNextPage } = useResumeList();

  const { setTarget } = useIntersectionObserver({
    onIntersect: () => fetchNextPage(),
    options: {
      threshold: 0.5,
    },
  });

  const resumeList = resumeListData?.pages.map((page) => page.resumes).flat();

  return (
    <Main>
      <MainHeader>
        <FilterContainer>
          <Filter>
            <span>직군</span>
            <Select
              width="12.5rem"
              onSelectOption={(option) => {
                if (option && typeof option.name === 'number' && typeof option.value === 'string')
                  setSelectedOccupation({ id: option.name, occupation: option.value });
              }}
            >
              <Select.TriggerButton />
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
          </Filter>
          <Filter>
            <span>경력</span>
            <Select width="12.5rem">
              <Select.TriggerButton />
              <Select.OptionList>
                {yearOptions.map((option) => {
                  return (
                    <Select.OptionItem key={option.value} value={option.value} name={option.label}>
                      {option.label}
                    </Select.OptionItem>
                  );
                })}
              </Select.OptionList>
            </Select>
          </Filter>
        </FilterContainer>

        <Button variant="default" size="m">
          내 이력서 보러가기
        </Button>
      </MainHeader>

      <ResumeList>
        {resumeList?.map((resume) => {
          return (
            <li key={resume.id}>
              <ResumeItem {...resume} />;
            </li>
          );
        })}
      </ResumeList>
      <div ref={setTarget}></div>
    </Main>
  );
};

export default Resume;
