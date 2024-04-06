class CustomError extends Error {
  errorCode: number;

  constructor(errorCode: number, message: string) {
    super(message);
    this.name = 'CustomError';
    this.errorCode = errorCode;
  }
}

export default CustomError;
