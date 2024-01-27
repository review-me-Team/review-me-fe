import React from 'react';
import { Button, Select } from 'review-me-design-system';
import Header from '@components/Header';
import ResumeItem from '@components/ResumeItem';
import { Filter, FilterContainer, Main, MainHeader, ResumeList } from './style';

const Resume = () => {
  const scope = [
    {
      id: 1,
      scope: '전체 공개',
    },
    {
      id: 2,
      scope: '친구만 공개',
    },
    {
      id: 3,
      scope: '비공개',
    },
  ].map(({ id, scope }) => ({ value: id, label: scope }));
  const yearOptions = [
    { value: 1, label: '신입' },
    { value: 2, label: '1 ~ 3년차' },
    { value: 3, label: '4 ~ 6년차' },
    { value: 4, label: '7 ~ 9년차' },
    { value: 5, label: '10년차 이상' },
  ];

  return (
    <>
      <Header />

      <Main>
        <MainHeader>
          <FilterContainer>
            <Filter>
              <span>직군</span>
              <Select width="10rem">
                <Select.TriggerButton />
                <Select.OptionList>
                  {scope.map((option) => {
                    return (
                      <Select.OptionItem key={option.value} value={option.value} label={option.label}>
                        {option.label}
                      </Select.OptionItem>
                    );
                  })}
                </Select.OptionList>
              </Select>
            </Filter>
            <Filter>
              <span>경력</span>
              <Select width="10rem">
                <Select.TriggerButton />
                <Select.OptionList>
                  {yearOptions.map((option) => {
                    return (
                      <Select.OptionItem key={option.value} value={option.value} label={option.label}>
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
          <ResumeItem
            id={1}
            title="이력서"
            writerName="aken-you"
            writerProfileUrl="https://avatars.githubusercontent.com/u/96980857?v=4"
            year={0}
            occupation="DevOps System Engineer"
            createdAt="2023-12-22 15:16:42"
          />
          <ResumeItem
            id={2}
            title="이력서"
            writerName="aken-you"
            writerProfileUrl="https://avatars.githubusercontent.com/u/96980857?v=4"
            year={0}
            occupation="DevOps System Engineer"
            createdAt="2023-12-22 15:16:42"
          />
          <ResumeItem
            id={3}
            title="이력서"
            writerName="aken-you"
            writerProfileUrl="https://avatars.githubusercontent.com/u/96980857?v=4"
            year={0}
            occupation="DevOps System Engineer"
            createdAt="2023-12-22 15:16:42"
          />
          <ResumeItem
            id={4}
            title="이력서"
            writerName="aken-you"
            writerProfileUrl="https://avatars.githubusercontent.com/u/96980857?v=4"
            year={0}
            occupation="DevOps System Engineer"
            createdAt="2023-12-22 15:16:42"
          />
          <ResumeItem
            id={5}
            title="이력서"
            writerName="aken-you"
            writerProfileUrl="https://avatars.githubusercontent.com/u/96980857?v=4"
            year={0}
            occupation="DevOps System Engineer"
            createdAt="2023-12-22 15:16:42"
          />
          <ResumeItem
            id={6}
            title="이력서"
            writerName="aken-you"
            writerProfileUrl="https://avatars.githubusercontent.com/u/96980857?v=4"
            year={0}
            occupation="DevOps System Engineer"
            createdAt="2023-12-22 15:16:42"
          />
        </ResumeList>
      </Main>
    </>
  );
};

export default Resume;
