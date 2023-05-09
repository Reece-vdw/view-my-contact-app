import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Contact } from '../models/contacts.model';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  private contactUrl = 'assets/contacts.json';

  constructor(private http: HttpClient) {}

  getContacts() {
    return this.http.get<Contact[]>(this.contactUrl);
  }

  filterContacts(term: string): Observable<Contact[]> {
    return this.getContacts().pipe(
      map((contacts) => {
        return contacts;
      })
    );
  }

  addContact(contact: Contact): Observable<Contact[]> {
    return this.getContacts().pipe(
      map((contacts) => {
        contacts.push(contact);
        return contacts;
      })
    );
  }
}
