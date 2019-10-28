import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ContactsService } from 'src/app/shared/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contactslist',
  templateUrl: './contactslist.component.html',
  styleUrls: ['./contactslist.component.css']
})
export class ContactslistComponent implements OnInit {
  lstContacts:any=[];
  constructor(private router:Router,private contact:ContactsService) { }

  ngOnInit() {
    this.contact.GetAllContacts().subscribe(
      (res:any)=>{
        this.lstContacts = res.lstContacts;
        console.log(res);
      },
      (err:any)=>{
        console.log(err);
      }
    );
  }
  onContactClick(){
    
  }

}
