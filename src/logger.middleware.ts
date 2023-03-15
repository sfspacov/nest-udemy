import { NestMiddleware } from "@nestjs/common";

export class LoggerMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: Function) {
        console.log(req.method, req.url, req.body, req.headers);
        next();
    }

}