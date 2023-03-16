import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class MyCustomExceptionFilter implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        res.status(exception.getStatus())
            .json({
                timestap: new Date().toISOString(),
                message: exception.message,
                path: req.url,
                statusCode: exception.getStatus()
            })
    }
}