interface AppErrorProps {
  statusCode: number;
  message: string;
  additionalInfo: object;
}

class AppError {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly additionalInfo: object;

  constructor({ statusCode = 400, message, additionalInfo }: AppErrorProps) {
    this.statusCode = statusCode;
    this.message = message;
    this.additionalInfo = additionalInfo;
  }
}

export { AppError };
