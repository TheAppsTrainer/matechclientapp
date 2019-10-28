import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  constructor(private httpc:HttpClient) { }
  readonly baseURL='http://localhost:39404/api/';


  SaveContact(model:any){
    return this.httpc.post(this.baseURL+'Contacts/SaveContact',model);
  }
  GetAllContacts(){
    return this.httpc.get(this.baseURL+'Contacts/GetAllContacts');
  }
  GetConatcDatabyPersonId(PersonId:string){
    let model={
      "PersonId":PersonId
    }
    return this.httpc.post(this.baseURL+'Contacts/GetConatcDatabyPersonId',model);
  }
}
