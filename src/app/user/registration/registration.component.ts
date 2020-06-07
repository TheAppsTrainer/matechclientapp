import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: []
})
export class RegistrationComponent implements OnInit {

  constructor(public service:UserService) { }

  ngOnInit() {
    this.service.formModel.reset();
  }

  onSubmit(){
    debugger;
    let abcMod = this.service.formModel;
    let vvTR="";
    this.service.register().subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.service.formModel.reset();
        }else{
          res.errors.forEach(element => {
            switch(element.code){
              case 'DuplicateUserName':

              break;

              default:
              break;
            }
          });
        }
      },
      err=>{
        console.log(err);
      }
    );
  }
}