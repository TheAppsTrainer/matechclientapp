import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth/auth.guard';
import { ContactslistComponent } from './home/contactslist/contactslist.component';
import { NewcontactComponent } from './home/newcontact/newcontact.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login', pathMatch:'full'},
  {
    path:'user',component:UserComponent,
    children:[
      { path:'registration',component:RegistrationComponent }
      ,{ path:'login',component:LoginComponent }
    ]
  }
  // ,{path:'home',component:HomeComponent, canActivate:[AuthGuard]}
  ,{path:'home', redirectTo:'/home/contactslist', pathMatch:'full'}
  ,{path:'home',component:HomeComponent, canActivate:[AuthGuard],
  children:[
    {path:'contactslist',component:ContactslistComponent},
    {path:'newcontact',component:NewcontactComponent}
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
