import { Injectable } from '@angular/core';
import { Contact } from '../interfaces/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

contacts: Contact[] = [
  {Id:1, FirstName: 'Henry', LastName:'Andes', PhoneNumber:'111-111-111', Address:'Valenzuela'},
  {Id:2, FirstName: 'Kevin', LastName:'Espiritu', PhoneNumber:'222-222-222', Address:'Marikina'},
  {Id:3, FirstName: 'Richard', LastName:'Licardo', PhoneNumber:'333-333-333', Address:'Los Angeles'}
]

  constructor() { }

  getContacts(){
    return this.contacts;
  }

  createContacts(newcontact:Contact){
    //finding hightest Id in the existing in memory list
    let highesId = 0;
    this.contacts.forEach(contactObject =>{
      if(contactObject.Id > highesId){
          highesId = contactObject.Id;
      }
    });

    this.contacts.push(
      {
        Id:highesId+1,
        FirstName:newcontact.FirstName,
        LastName:newcontact.LastName,
        PhoneNumber:newcontact.PhoneNumber,
        Address:newcontact.Address
      }
    );

  }

  updateContact(updateContact: Contact){
    const index = this.contacts.findIndex(contact => contact.Id == updateContact.Id);

    this.contacts[index].FirstName = updateContact.FirstName;
    this.contacts[index].LastName = updateContact.LastName;
    this.contacts[index].PhoneNumber = updateContact.PhoneNumber;
    this.contacts[index].Address = updateContact.Address;
 
  }

}
