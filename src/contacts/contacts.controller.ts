import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

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
    getOne(@Param("id") id: number) {
        let c = this.contacts.find(x => x.id == id)

        if (!c)
            throw new NotFoundException();

        return {...c};
    }
}
