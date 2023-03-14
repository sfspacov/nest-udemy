import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from '@nestjs/common';

@Controller('contacts')
export class ContactsController {
    contacts = [
        { id: 1, name: 'Vinod', email: 'vinod@gmail.com' },
        { id: 2, name: 'John', email: 'john@gmail.com' },
        { id: 3, name: 'Slash', email: 'slash@gmail.com' },
        { id: 4, name: 'Elton', email: 'elton@gmail.com' },
    ];

    @Get()
    getAll() {
        return [...this.contacts];
    }

    @Get('/:id')
    getOne(@Param("id") id) {
        let c = this.contacts.find(x => x.id == id)

        if (!c)
            throw new NotFoundException();

        return {...c};
    }

    @HttpCode(HttpStatus.CREATED)
    @Post()
    createContacts(@Body() body){
        let ids = this.contacts.map(x => x.id);
        let newId = 1 + Math.max(...ids);

        if (body instanceof Array) {
            let contacts = body;
            contacts.forEach((x, i) => x.id = newId + 1);
            this.contacts.push(...contacts);
            return contacts;
        } else {
            let contact = body;
            contact.id = newId;
            this.contacts.push(contact);
            return contact;
        }
    }

    @Put('/:id')
    updateContact(@Param("id") id, @Body() contact){
        
        let index = this.contacts.findIndex(c => c.id == id);

        if (index===-1)
            throw new NotFoundException();            

        contact.id = parseInt(id);
        this.contacts[index] = contact;
        return contact;
    }
}
