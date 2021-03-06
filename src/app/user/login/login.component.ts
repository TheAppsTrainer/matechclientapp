import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  formModel = {
    UserName:'',
    Password:''
  }

  constructor(private service:UserService, private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('token')!=null){
      this.router.navigateByUrl('/home');
    }
  }

  onSubmit(formData:NgForm){
    this.service.login(formData.value).subscribe(
      (res:any)=>{
        localStorage.setItem('token',res.token);
        this.router.navigateByUrl('/home');
      },
      err=>{
        if(err.status==400){
          console.log('Authentication Error!');
          console.log('Username OR password is incorrect.');
        }else{
          console.log(err);
        }
      }
    );
  }

}
