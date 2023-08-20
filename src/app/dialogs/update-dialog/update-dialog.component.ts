import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Contact } from 'src/app/interfaces/contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss']
})
export class UpdateDialogComponent implements OnInit {

  newContact!: Contact;
  updateForm = new FormGroup({
    firstName: new FormControl('',[Validators.required,Validators.maxLength(50)]),
    lastName: new FormControl('',[Validators.required,Validators.maxLength(50)]),
    phoneNumber: new FormControl('',[Validators.required,Validators.maxLength(20)]),
    address: new FormControl('',[Validators.required,Validators.maxLength(200)]),
  })

  contactToUpdate!:Contact;

constructor(@Inject(MAT_DIALOG_DATA) public data:Contact, 
private contactService:ContactsService,private router:Router,
public dialogRef:MatDialogRef<DeleteDialogComponent>){
  this.contactToUpdate= data;
}
  ngOnInit(): void {

    this.updateForm.controls['firstName'].setValue(this.contactToUpdate.FirstName);
    this.updateForm.controls['lastName'].setValue(this.contactToUpdate.LastName);
    this.updateForm.controls['phoneNumber'].setValue(this.contactToUpdate.PhoneNumber);
    this.updateForm.controls['address'].setValue(this.contactToUpdate.Address);

    console.log(this.contactToUpdate);
  }
  
  onSubmit(){

    this.newContact= {
      Id:this.contactToUpdate.Id,
      FirstName:this.updateForm.controls['firstName'].value as string,
      LastName:this.updateForm.controls['lastName'].value as string,
      PhoneNumber:this.updateForm.controls['phoneNumber'].value as string,
      Address:this.updateForm.controls['address'].value as string,
    }

    this.contactService.updateContact(this.newContact);
    this.dialogRef.close();
    this.router.navigate(['/contacts'])
  }

  onCancel(){}

}
