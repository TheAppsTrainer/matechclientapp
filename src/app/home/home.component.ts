import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { ContactsService } from '../shared/contacts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
userDetails:any={
  FullName:"",
  UserName:"",
  Email:""
};

  constructor(private router:Router,private service:UserService,private contact:ContactsService) { }

  ngOnInit() {
    this.service.getUserProfile().subscribe(
      res=>{
        this.userDetails = res;
        // localStorage.setItem('UserName',this.userDetails);
        // console.log(this.userDetails);
      },
      err=>{
        console.log(err);
      }
    );
    
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
