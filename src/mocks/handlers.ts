import { http, HttpResponse } from 'msw';
import { REQUEST_URL } from '@constants';
import { comments } from './data/comments';
import { emojis } from './data/emojis';
import { feedbacks } from './data/feedbacks';
import { labels } from './data/labels';
import { occupations } from './data/occupations';
import { questions } from './data/questions';
import { resumes } from './data/resumes';
import { scopes } from './data/scopes';

export const handlers = [
  // * resume
  http.get(REQUEST_URL.RESUME, ({ request }) => {
    const url = new URL(request.url);
    const pageNumber = Number(url.searchParams.get('page') || 0);
    const pageSize = Number(url.searchParams.get('size') || 10);
    const totalCount = resumes.length;
    const lastPage = Math.ceil(totalCount / pageSize) - 1;

    return HttpResponse.json({
      data: {
        resumes: resumes.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
        pageNumber,
        lastPage,
        pageSize,
      },
    });
  }),
  http.get(`${REQUEST_URL.RESUME}/:resumeId`, ({ params }) => {
    const { resumeId } = params;
    const data = resumes.find(({ id }) => id === Number(resumeId[0]));

    if (data) {
      const { title, writerName, writerProfileUrl, occupation, year } = data;

      return HttpResponse.json({
        data: {
          resumeUrl: process.env.FAKE_RESUME_URL,
          title,
          writerName,
          writerProfileUrl,
          occupation,
          year,
        },
      });
    }

    return new HttpResponse('The provided resumeId does not exist.', {
      status: 404,
    });
  }),
  http.post(REQUEST_URL.RESUME, async ({ request }) => {
    const data = await request.formData();
    const title = data.get('title');
    const year = data.get('year');
    const scopeId = data.get('scopeId');
    const occupationId = data.get('occupationId');
    const pdf = data.get('pdf');

    if (!title || !year || !scopeId || !occupationId || !pdf) {
      return new HttpResponse('Required data was not provided.', { status: 400 });
    }

    return HttpResponse.json({
      data: { id: 1 },
    });
  }),

  // * comment
  http.get(`${REQUEST_URL.RESUME}/:resumeId/comment`, ({ request }) => {
    const url = new URL(request.url);
    const pageNumber = Number(url.searchParams.get('page') || 0);
    const pageSize = Number(url.searchParams.get('size') || 10);
    const totalCount = comments.length;
    const lastPage = Math.ceil(totalCount / pageSize);

    return HttpResponse.json({
      data: {
        comments: comments.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
        pageNumber,
        lastPage,
        pageSize,
      },
    });
  }),
  http.post(`${REQUEST_URL.RESUME}/:resumeId/comment`, async ({ request }) => {
    const data = await request.formData();
    const content = data.get('content');

    if (!content) {
      return new HttpResponse('Required data was not provided.', { status: 400 });
    }

    return new HttpResponse(null, { status: 201 });
  }),

  // * feedback
  http.get(`${REQUEST_URL.RESUME}/:resumeId/feedback`, ({ request }) => {
    const url = new URL(request.url);
    const pageNumber = Number(url.searchParams.get('page') || 0);
    const pageSize = Number(url.searchParams.get('size') || 10);
    const totalCount = feedbacks.length;
    const lastPage = Math.ceil(totalCount / pageSize);

    return HttpResponse.json({
      data: {
        feedbacks: feedbacks.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
        pageNumber,
        lastPage,
        pageSize,
      },
    });
  }),
  http.post(`${REQUEST_URL.RESUME}/:resumeId/feedback`, async ({ request }) => {
    const data = await request.formData();
    const content = data.get('content');
    const labelId = data.get('labelId');
    const resumePage = data.get('resumePage');

    // * headers에 authorization이 있는지 확인해야 하는데, 로그인 구현을 안했으므로 생략
    // * labelId는 선택사항
    if (!content || !resumePage) {
      return new HttpResponse('Required data was not provided.', { status: 400 });
    }

    return new HttpResponse(null, { status: 201 });
  }),

  // * question
  http.get(`${REQUEST_URL.RESUME}/:resumeId/question`, ({ request }) => {
    const url = new URL(request.url);
    const pageNumber = Number(url.searchParams.get('page') || 0);
    const pageSize = 10;
    const totalCount = questions.length;
    const lastPage = Math.ceil(totalCount / pageSize);

    return HttpResponse.json({
      data: {
        questions: questions.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize),
        pageNumber,
        lastPage,
        pageSize,
      },
    });
  }),
  http.post(`${REQUEST_URL.RESUME}/:resumeId/question`, async ({ request }) => {
    const data = await request.formData();
    const content = data.get('content');
    const labelId = data.get('labelId');
    const labelContent = data.get('labelContent');
    const resumePage = data.get('resumePage');

    // * headers에 authorization이 있는지 확인해야 하는데, 로그인 구현을 안했으므로 생략
    // * labelContent가 이미 존재한다면, labelId 보내기
    // * labelContent가 존재하지 않다면, labelContent 보내기
    // * labelId, labelContent는 선택사항
    if (!content || !resumePage) {
      return new HttpResponse('Required data was not provided.', { status: 400 });
    }

    return new HttpResponse(null, { status: 201 });
  }),

  // * util
  http.get(REQUEST_URL.LABEL, () => {
    return HttpResponse.json({ data: { labels } });
  }),
  http.get(REQUEST_URL.OCCUPATION, () => {
    return HttpResponse.json({ data: { occupations } });
  }),
  http.get(REQUEST_URL.EMOJI, () => {
    return HttpResponse.json({ data: { emojis } });
  }),
  http.get(REQUEST_URL.SCOPE, () => {
    return HttpResponse.json({ data: { scopes } });
  }),
];
