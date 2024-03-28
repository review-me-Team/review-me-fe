import React, { Component, ReactNode } from 'react';
import CustomError from '@apis/customError';
import ErrorPage from '@pages/ErrorPage';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  err: CustomError | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    err: null,
  };

  public static getDerivedStateFromError(error: CustomError): State {
    return { hasError: true, err: error };
  }

  public componentDidCatch(error: CustomError) {
    console.error('Uncaught error: ', error.message);
  }

  resetError = () => {
    this.setState({ hasError: false, err: null });
  };

  public render() {
    if (this.state.hasError) {
      switch (this.state.err?.errorCode) {
        case 401:
          return (
            <ErrorPage
              title="인증에 실패했습니다."
              description="로그인을 다시 시도해주세요."
              resetError={this.resetError}
            />
          );
        case 403:
          return (
            <ErrorPage
              title="접근이 거부되었습니다."
              description="페이지를 볼 수 있는 권한이 없습니다."
              resetError={this.resetError}
            />
          );
        case 404:
          return (
            <ErrorPage
              title="페이지를 찾을 수 없습니다."
              description="올바른 주소를 입력했는지 다시 확인해주세요."
              resetError={this.resetError}
            />
          );
        default:
          return (
            <ErrorPage
              title="알 수 없는 오류가 발생했습니다."
              description="잠시 후 다시 시도해주세요."
              resetError={this.resetError}
            />
          );
      }
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
