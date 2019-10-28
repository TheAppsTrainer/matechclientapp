import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ContactsService } from 'src/app/shared/contacts.service';
import { Router } from '@angular/router';
import { UtilitiesService } from 'src/app/shared/utilities.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-newcontact',
  templateUrl: './newcontact.component.html',
  styleUrls: ['./newcontact.component.css']
})
export class NewcontactComponent implements OnInit {
  // newContactForm
  constructor(private fb: FormBuilder, private contact: ContactsService, private util: UtilitiesService
    , private toastr: ToastrService, private router: Router) { }
  newContactForm = this.fb.group({
    PersonId: [''],
    PersonName: ['', [Validators.required]],
    Email: ['', Validators.email],
    PhoneNumber: ['', Validators.email],
    Age: [0],
    GenderCode: ['0'],
    CountryCode: ['0'],
    CityCode: ['0'],
    ZipCode: [''],
    Address: [''],

    FacebookProfile: [''],
    LinkedInProfile: [''],
    TwitterProfile: [''],
  });
  buildNewForm(currentData:any) {
    if (currentData!=null) {
      this.newContactForm = this.fb.group({
        PersonId: [currentData.PersonId],
        PersonName: [currentData.PersonName, [Validators.required]],
        Email: [currentData.Email, Validators.email],
        PhoneNumber: [currentData.PhoneNumber, Validators.email],
        Age: [currentData.Age],
        GenderCode: [currentData.GenderCode],
        GenderName: [currentData.GenderName],
        CountryCode: [currentData.CountryCode],
        CountryName: [currentData.CountryName],
        CityCode: [currentData.CityCode],
        CityName: [currentData.CityName],
        ZipCode: [currentData.ZipCode],
        Address: [currentData.Address],

        FacebookProfile: [currentData.FacebookProfile],
        LinkedInProfile: [currentData.LinkedInProfile],
        TwitterProfile: [currentData.TwitterProfile],
      });
      this.CountryChanged();

    } else {
      this.newContactForm = this.fb.group({
        PersonId: [''],
        PersonName: ['', [Validators.required]],
        Email: ['', Validators.email],
        PhoneNumber: ['', Validators.email],
        Age: [0],
        GenderCode: ['0'],
        GenderName: [''],
        CountryCode: ['0'],
        CountryName: [''],
        CityCode: ['0'],
        CityName: [''],
        ZipCode: [''],
        Address: [''],

        FacebookProfile: [''],
        LinkedInProfile: [''],
        TwitterProfile: [''],
      });
    }
  }
  ngOnInit() {
    debugger;
    if (history.state.PersonId != '0') {
      this.contact.GetConatcDatabyPersonId(history.state.PersonId).subscribe(
        (res:any)=>{
          this.buildNewForm(res.ContactDetail);
        },
        (err:any)=>{
          this.toastr.error(err.message,'Error!');
        }
      );
      
    }
    this.util.getInitialData()
  }

  CountryChanged() {
    debugger;
    this.util.GetCitiesByCountryCode(this.newContactForm.value.CountryCode);
  }

  onSubmit() {
    this.contact.SaveContact(this.newContactForm.value).subscribe(
      (res: any) => {
        debugger;
        if (res.message.includes('successfully saved')) {
          this.toastr.success(res.message, 'Record Saved!');
          this.buildNewForm(null);
        }else if (res.message.includes('successfully updated')) {
          this.toastr.success(res.message, 'Record Updated!');
          this.buildNewForm(null);
        }
      },
      (err: any) => {
        this.toastr.error(err.message, 'Error!');
      }
    );
  }

}
