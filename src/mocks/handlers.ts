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
          resumeUrl: '',
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
