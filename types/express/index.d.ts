import 'express';

declare module 'express-serve-static-core' {
  interface Response {
    sendResult: (data: any, code: number, message: string) => void;
  }
}
