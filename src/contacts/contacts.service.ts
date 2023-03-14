import { Injectable } from '@nestjs/common';
import * as fs from 'fs'

const filename = './contacts.json'
@Injectable()
export class ContactsService {
    contacts = [];
    constructor() {
        try {
            let content = fs.readFileSync(filename, 'utf-8')
            this.contacts = JSON.parse(content);
        } catch (error) {
            this.contacts = [];
        }
    }

    replace(id, contact) {
        let index = this.contacts.findIndex(c => c.id == id);
        contact.id = parseInt(id);
        this.contacts[index] = contact;
        this.writeToFile();
    }

    update(id, contact) {
        let index = this.contacts.findIndex(c => c.id == id);
        this.contacts[index] = { ...this.contacts[index], ...contact }
        this.writeToFile();
    }

    delete(id) {
        let index = this.contacts.findIndex(c => c.id == id);

        this.contacts.splice(index, 1);
        this.writeToFile();
    }
    getAll() {
        return [...this.contacts];
    }

    getById(id) {
        return this.contacts.find(x => x.id == id);
    }

    writeToFile() {
        fs.writeFileSync(filename, JSON.stringify(this.contacts), 'utf-8')
    }

    exists = (id) => this.contacts.findIndex(c => c.id == id) != -1;

    get nextId() {
        if (this.contacts.length === 0) return 1;
        let ids = this.contacts.map(c => c.id);
        return 1 + Math.max(...ids);
    }

    addOneContact(contact) {
        contact.id = this.nextId;
        this.contacts.push(contact);
        this.writeToFile();
        return contact;
    }

    addManyContacts(contacts) {
        let nextId = this.nextId;
        contacts.forEach((c, i) => c.id = i + nextId);
        this.contacts.push(...contacts);
        this.writeToFile();
        return contacts;
    }
}