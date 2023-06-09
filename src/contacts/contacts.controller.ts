import { BadRequestException, Body, Controller, DefaultValuePipe, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { MandatoryFieldsPipe } from 'src/mandatory-fields.pipe';
import { Contact } from './contact.schema';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
    constructor(private service: ContactsService) {

    }

    @HttpCode(HttpStatus.CREATED)
    @Post('createMongo')
    @UsePipes(new ValidationPipe({ transform: true }))
    createContact(@Body() body: Contact) {
        if (body instanceof Array) {
            return this.service.addManyContacts(body);
        } else {
            return this.service.addOneContact(body);
        }
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    create(@Body(new MandatoryFieldsPipe(['name', 'email', 'phone'])) body) {
        if (body instanceof Array) {
            return this.service.addManyContacts(body);
        } else {
            return this.service.addOneContact(body);
        }
    }

    @Get()
    getAll(@Query('_page', new DefaultValuePipe(1), ParseIntPipe) page, @Query('_limit', new DefaultValuePipe(3), ParseIntPipe) limit) {
        return this.service.getAll(page, limit);
    }

    @Get('/:id')
    async getById(@Param("id") id: string) {
        let c = await this.service.getById(id);

        if (!c)
            throw new NotFoundException();

        return c;
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Put('/:id')
    @UsePipes(new ValidationPipe({ transform: true }))
    async updateMongo(@Param('id') id: string, @Body() contact: Contact) {
        try {
            await this.service.replace(id, contact);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Patch('/:id')
    partialUpdate(id: string, @Body() contact) {
        if (this.service.exists(id)) {
            this.service.update(id, contact);
            return;
        }
        throw new NotFoundException();
    }

    @HttpCode(HttpStatus.NO_CONTENT)
    @Delete('/:id')
    async delete(@Param('id') id) {
        let ret = await this.service.delete(id);
        if (ret.deletedCount === 0) {
            throw new NotFoundException();
        }
    }
}