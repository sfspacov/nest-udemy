import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs'
import { Model } from 'mongoose';
import { Contact } from './contact.schema';

const filename = './contacts.json'
@Injectable()
export class ContactsService {
    contacts = [];
    constructor(@InjectModel('Contact') private ContactModel: Model<Contact>) {
        try {
            let content = fs.readFileSync(filename, 'utf-8')
            this.contacts = JSON.parse(content);
        } catch (error) {
            this.contacts = [];
        }
    }

    replace(id, contact) {
        let index = this.contacts.findIndex(c => c.id === id);
        contact.id = parseInt(id);
        this.contacts[index] = contact;
        this.writeToFile();
    }

    update(id, contact) {
        let index = this.contacts.findIndex(c => c.id === id);
        this.contacts[index] = { ...this.contacts[index], ...contact }
        this.writeToFile();
    }

    delete(id) {
        let index = this.contacts.findIndex(c => c.id === id);

        this.contacts.splice(index, 1);
        this.writeToFile();
    }
    getAll(page: number, limit: number) {
        return this.ContactModel.find().limit(limit).skip((page-1)*limit);
    }

    async getById(id: string) {
        return await this.ContactModel.findById(id);
    }

    writeToFile() {
        fs.writeFileSync(filename, JSON.stringify(this.contacts), 'utf-8')
    }

    exists = (id) => this.ContactModel.exists(id);

    get nextId() {
        if (this.contacts.length === 0) return 1;
        let ids = this.contacts.map(c => c.id);
        return 1 + Math.max(...ids);
    }

    addOneContact(contact: Contact) {
        let c = new this.ContactModel({ ...contact })
        c.save();
        return c;
    }

    addManyContacts(contacts) {
        let nextId = this.nextId;
        contacts.forEach((c, i) => c.id = i + nextId);
        this.contacts.push(...contacts);
        this.writeToFile();
        return contacts;
    }
}