import { RESUME_FILE_NAME_LIMIT } from '@constants';
import {
  formatDate,
  getRangeText,
  isNumeric,
  manageBodyScroll,
  parseJwt,
  validateContent,
  validateFileName,
  validateTitle,
  validateYear,
} from './index';

describe('시간을 yyyy.mm.dd 형식으로 바꾸는 함수', () => {
  it('시간 문자열이 yyyy.mm.dd 형식인 문자열로 바뀐다.', () => {
    const date = '2022-01-01T00:00:00.000Z';

    const result = formatDate(date);

    const expected = '2022.01.01';
    expect(result).toBe(expected);
  });
});

describe('body 태그의 스크롤을 컨트롤하는 함수', () => {
  const DEFAULT_OVERFLOW = '';
  const HIDDEN = 'hidden';
  const AUTO = 'auto';

  function resetBodyStyle() {
    document.body.style.overflow = DEFAULT_OVERFLOW;
  }

  afterEach(() => {
    resetBodyStyle();
  });

  it('parameter 값이 true일 때 스크롤된다.', () => {
    manageBodyScroll(true);

    expect(document.body.style.overflow).toBe(AUTO);
  });

  it('parameter 값이 false일 때 스크롤이 안된다.', () => {
    manageBodyScroll(false);

    expect(document.body.style.overflow).toBe(HIDDEN);
  });

  it('스크롤이 안되는 상태에서 parameter 값이 true일 때 스크롤된다.', () => {
    document.body.style.overflow = HIDDEN;

    manageBodyScroll(true);

    expect(document.body.style.overflow).toBe(AUTO);
  });
});

describe('JWT 토큰을 디코딩하는 함수', () => {
  it('JWT 토큰을 디코딩한다.', () => {
    const jwt =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    const result = parseJwt(jwt);

    const expected = {
      sub: '1234567890',
      name: 'John Doe',
      iat: 1516239022,
    };
    expect(result).toEqual(expected);
  });
});

describe('경력의 범위를 나타내는 함수', () => {
  const MIN_CAREER = 0;
  const MAX_CAREER = 10;

  it('경력의 범위가 0 ~ 5년차일 때, 신입 ~ 5년을 반환한다.', () => {
    const result = getRangeText({ min: MIN_CAREER, max: 5 });

    const expected = '신입 ~ 5년';
    expect(result).toBe(expected);
  });

  it('경력의 범위가 5년차 이상일 때, 5년 ~ 10년 +을 반환한다.', () => {
    const result = getRangeText({ min: 5, max: MAX_CAREER });

    const expected = '5년 ~ 10년 +';
    expect(result).toBe(expected);
  });

  it('경력의 범위가 3 ~ 5년차 이상일 때, 3년 ~ 5년을 반환한다.', () => {
    const result = getRangeText({ min: 3, max: 5 });

    const expected = '3년 ~ 5년';
    expect(result).toBe(expected);
  });

  it('경력의 범위가 0년차 이상일 때, 전체를 반환한다.', () => {
    const result = getRangeText({ min: MIN_CAREER, max: MAX_CAREER });

    const expected = '전체';
    expect(result).toBe(expected);
  });

  describe('경력의 범위가', () => {
    it('0일 때, 신입을 반환한다.', () => {
      const result = getRangeText({ min: MIN_CAREER, max: MIN_CAREER });

      const expected = '신입';
      expect(result).toBe(expected);
    });

    it('10일 때, 10년 +를 반환한다.', () => {
      const result = getRangeText({ min: MAX_CAREER, max: MAX_CAREER });

      const expected = '10년 +';
      expect(result).toBe(expected);
    });

    it('5일 때, 5년을 반환한다.', () => {
      const result = getRangeText({ min: 5, max: 5 });

      const expected = '5년';
      expect(result).toBe(expected);
    });
  });
});

describe('숫자로 변환했을 때 숫자인지 확인하는 함수', () => {
  it('123은 숫자로 이뤄져 있다.', () => {
    const result = isNumeric(123);

    expect(result).toBe(true);
  });

  it("'123'은 숫자로 이뤄져 있다.", () => {
    const result = isNumeric('123');

    expect(result).toBe(true);
  });

  it("'123abc'은 숫자로 이뤄져 있지 않다.", () => {
    const result = isNumeric('123abc');

    expect(result).toBe(false);
  });

  it('undefined은 숫자로 이뤄져 있지 않다.', () => {
    const result = isNumeric(undefined);

    expect(result).toBe(false);
  });
});

describe('파일 이름을 검증하는 함수', () => {
  const VALID_FILE_NAME = 'valid_file_name';
  const INVALID_FILE_NAME = 'invalid_file_invalid_file_invalid_file_invalid_file_name';

  it(`파일 이름 길이가 ${RESUME_FILE_NAME_LIMIT} 이하일 경우 유효하다.`, () => {
    const resumeFile = { name: VALID_FILE_NAME } as File;

    const result = validateFileName(resumeFile);

    expect(resumeFile.name.length).toBeLessThanOrEqual(RESUME_FILE_NAME_LIMIT);
    expect(result).toBe(true);
  });

  it(`파일 이름 길이가 ${RESUME_FILE_NAME_LIMIT} 초과할 경우 유효하지 않다.`, () => {
    const resumeFile = { name: INVALID_FILE_NAME } as File;

    const result = validateFileName(resumeFile);

    expect(resumeFile.name.length).toBeGreaterThan(RESUME_FILE_NAME_LIMIT);
    expect(result).toBe(false);
  });
});

describe('제목을 검증하는 함수', () => {
  it('제목이 존재할 경우, 유효하다.', () => {
    const title = 'title';

    const result = validateTitle(title);

    expect(title.trim().length).toBeGreaterThan(0);
    expect(result).toBe(true);
  });

  it('제목이 존재하지 않을 경우, 유효하지 않다.', () => {
    const title = '';

    const result = validateTitle(title);

    expect(title.trim().length).toBe(0);
    expect(result).toBe(false);
  });
});

describe('경력을 검증하는 함수', () => {
  it('경력이 0년 이상일 경우, 유효하다.', () => {
    const year = 0;

    const result = validateYear(year);

    expect(year).toBeGreaterThanOrEqual(0);
    expect(result).toBe(true);
  });

  it('경력이 0년 미만일 경우, 유효하지 않다.', () => {
    const year = -1;

    const result = validateYear(year);

    expect(year).toBeLessThan(0);
    expect(result).toBe(false);
  });
});

describe('컨텐츠의 길이를 검증하는 함수', () => {
  it('컨텐츠의 길이가 0 이상일 경우, 유효하다.', () => {
    const content = 'content';

    const result = validateContent(content);

    expect(content.trim().length).toBeGreaterThan(0);
    expect(result).toBe(true);
  });

  it('컨텐츠의 길이가 0일 경우, 유효하지 않다.', () => {
    const content = '';

    const result = validateContent(content);

    expect(content.trim().length).toBe(0);
    expect(result).toBe(false);
  });
});
