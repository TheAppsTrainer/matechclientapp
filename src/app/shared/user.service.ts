import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fb:FormBuilder,private httpc:HttpClient) { }
  readonly baseURL='http://localhost:39404/api/';

  formModel = this.fb.group({
    UserName:['',[Validators.required,Validators.minLength(3)]],
    Email:['',Validators.email],
    FullName:[''],
    Passwords:this.fb.group({
      Password:['',[Validators.required,Validators.minLength(4)]],
      ConfirmPassword:['',Validators.required]
    },{validator:this.comparePassword})
  });

  comparePassword(fb:FormGroup){
    let confPassFormControll = fb.get('ConfirmPassword');
    if(confPassFormControll.errors==null || 'passwordMismatch' in confPassFormControll.errors){
      if(fb.get('ConfirmPassword').value!= confPassFormControll.value)
        confPassFormControll.setErrors({passwordMismatch:true});
      else
        confPassFormControll.setErrors(null);
    }
  }
  register(){
    var model = {
      UserName:this.formModel.value.UserName,
      Email:this.formModel.value.Email,
      FullName:this.formModel.value.FullName,
      Password:this.formModel.value.Passwords.Password
    };
    debugger;
    return this.httpc.post(this.baseURL + 'ApplicationUser/register',model);
  }

  login(formData){
    return this.httpc.post(this.baseURL + 'ApplicationUser/login',formData);
  }

  getUserProfile(){
    // var tokenHeader = new HttpHeaders({'Authorization':'Bearer ' + localStorage.getItem('token')});
    // return this.httpc.get(this.baseURL + 'UserProfile',{headers:tokenHeader});
    return this.httpc.get(this.baseURL + 'UserProfile');
  }
}
