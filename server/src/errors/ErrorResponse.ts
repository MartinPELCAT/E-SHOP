export class ErrorResponse implements Error {
  name: string;
  message: string;
  stack?: string | undefined;

  constructor(msg: string) {
    let { message, name, stack } = new Error(msg);
    this.message = message;
    this.name = name;
    this.stack = stack;
  }

  public toJson = () => {
    return { message: this.message };
  };
}
