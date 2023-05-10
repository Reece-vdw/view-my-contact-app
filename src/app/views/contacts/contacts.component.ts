import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contacts.model';
import { ContactsService } from 'src/app/services/contacts.service';
import contactsjson from 'src/assets/contacts.json';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { AgifyReponse } from 'src/app/models/agifyResponse.model';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  filteredContacts: Contact[] = [];
  searchQuery = '';
  selectedContact: Contact | null = null;
  agifyAge: number | null = null;
  showModal = false;
  firstName = '';
  lastName = '';
  cellphone = '';
  address = '';
  biography = '';
  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit() {
    this.http.get<Contact[]>('assets/contacts.json').subscribe((contacts) => {
      this.contacts = this.contacts;
      this.filteredContacts = contacts;
    });
  }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('assets/contacts.json');
  }

  getInitials(name: string): string {
    const words = name.split(' ');
    const initials = words.map((word) => word.charAt(0)).join('');
    return initials.toUpperCase();
  }

  filteredContactsFuc(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredContacts = this.contacts.filter(
      (contacts) =>
        contacts.firstName.toLowerCase().includes(query) ||
        contacts.lastName?.toLowerCase().includes(query) ||
        '${contacts.firstName} ${contacts.lastName}'
          .toLowerCase()
          .includes(query) ||
        contacts.cellNumber?.includes(query)
    );
  }

  getAgifyAge(name: string): Observable<AgifyReponse> {
    return this.http.get<AgifyReponse>('https://api.agify.io?name=${name}');
  }

  selectContacts(contact: Contact): void {
    this.selectedContact = contact;
    this.getAgifyAge(contact.firstName).subscribe((response) => {
      this.agifyAge = response.age;
    });
  }
  addContact() {
    this.showModal = true;
  }

  submitContactForm() {
    if (
      !this.firstName ||
      !this.lastName ||
      !this.cellphone ||
      !this.address ||
      !this.biography
    ) {
      alert('All fields are required');
      return;
    }
    const newContact = {
      firstName: this.firstName,
      lastName: this.lastName,
      cellphone: this.cellphone,
      address: this.address,
      biography: this.biography,
    };

    this.contacts.push(newContact);
    this.showModal = false;
    this.firstName = '';
    this.lastName = '';
    this.cellphone = '';
    this.address = '';
    this.biography = '';
  }
}
