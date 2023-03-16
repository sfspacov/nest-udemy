import { Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query } from '@nestjs/common';
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
    getAll(@Query('_page', new DefaultValuePipe(1), ParseIntPipe) page, @Query('_limit', new DefaultValuePipe(10), ParseIntPipe) limit) {
        return this.service.getAll();
    }

    @Get('/:id')
    getById(@Param("id", ParseIntPipe) id: Number) {
        if (this.service.exists(id)) 
            return this.service.getById(id);
        
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
