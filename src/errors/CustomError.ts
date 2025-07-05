export class CustomError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
  ) {
    super(message);
  }

  public static badRequest(message: string) {
    return new CustomError(message, 400);
  }

  public static conflict(message: string) {
    return new CustomError(message, 409);
  }

  public static internal(message: string) {
    return new CustomError(message, 500);
  }
}
