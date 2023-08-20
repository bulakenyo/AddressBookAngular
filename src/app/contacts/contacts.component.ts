import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../services/contacts.service';
import { Contact } from '../interfaces/contact';
import { MatTableDataSource } from '@angular/material/table'
import { MatDialog } from '@angular/material/dialog';
import { UpdateDialogComponent } from '../dialogs/update-dialog/update-dialog.component';
import { DeleteDialogComponent } from '../dialogs/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {

  contactsDataArray:Contact[] = [];
  

  constructor(private contractService:ContactsService,private dialog:MatDialog){


}

ngOnInit(){
this.contactsDataArray = this.contractService.getContacts();
console.log(this.contactsDataArray);

}

columnsToDisplay = ['FirstName','LastName','PhoneNumber','Address','Update','Delete'];
  dataSource = new MatTableDataSource(this.contactsDataArray);

applyFilter(filterValue: string) {
  filterValue = filterValue.trim(); // Remove whitespace
  filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  this.dataSource.filter = filterValue;
}

onUpdate(contact:Contact){
  let dialog = this.dialog.open(UpdateDialogComponent,{
    height:'600px',
    width:'500px',
    data:contact
  })
}

onDelete(contact:Contact){
  let dialog = this.dialog.open(DeleteDialogComponent,{
    height:'600px',
    width:'500px'
  })
}

}
