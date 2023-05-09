import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contacts.model';
import { ContactsService } from 'src/app/services/contacts.service';
import contacts from 'src/assets/contacts.json';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact!: Contact;
  searchQuery = '';
  contactList: any = contacts;
  filteredContacts!: Contact[];

  constructor(private http: HttpClient, private userService: UserService) {}

  ngOnInit(): void {
    this.getContacts();
  }

  getContacts(): void {
    this.http.get<Contact[]>('/assets/contacts.json').subscribe(
      (data: Contact[]) => {
        this.contacts = data;
        if (this.contacts.length > 0) {
          this.selectedContact = this.contacts[0];
        }
      },
      (error) => {
        console.log('Error retrieving contacts', error);
      }
    );
  }

  onSelect(contact: Contact) {
    this.selectedContact = contact;
    this.userService.getAge(contact.firstName).subscribe(
      (response) => {
        // update the age of the selected contact
        this.selectedContact.age = response.age;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  addContact() {}

  filterContacts() {
    if (!this.searchQuery) {
      this.filteredContacts = this.contacts;
      return;
    }

    const filtered = this.contacts.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`;
      return fullName.toLowerCase().includes(this.searchQuery.toLowerCase());
    });

    this.filteredContacts = filtered;
  }
}
