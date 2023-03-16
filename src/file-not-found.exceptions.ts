import { HttpException, HttpStatus } from "@nestjs/common";

export class FileNotFoundException extends HttpException{
    constructor(err: any = 'file not found')
    {
        super(err, HttpStatus.NOT_FOUND)
    }
}