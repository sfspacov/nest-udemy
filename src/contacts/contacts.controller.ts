import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Patch, Post, Put } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
    constructor(private service: ContactsService) {

    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    addOneContact(@Body() body) {
        if (body instanceof Array) {
            return this.service.addManyContacts(body);
        } else {
            return this.service.addOneContact(body);
        }
    }

    @Get()
    getAll() {
        return this.service.getAll();
    }

    @Get('/:id')
    getById(@Param("id") id) {
        if (this.service.exists(id)) {
            return this.service.getById(id);
        }
        throw new NotFoundException();
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Put('/:id')
    update(@Param("id") id, @Body() contact) {
        if (this.service.exists(id)) {
            this.service.replace(id, contact);
            return;
        }
        throw new NotFoundException();
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Patch('/:id')
    partialUpdate(@Param("id") id, @Body() contact) {
        if (this.service.exists(id)) {
            this.service.update(id, contact);
            return;
        }
        throw new NotFoundException();

    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/:id')
    deleteContact(@Param('id') id) {
        if (this.service.exists(id)) {
            this.service.delete(id);
            return;
        }
        throw new NotFoundException();
        
    }
}
