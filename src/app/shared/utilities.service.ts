import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { discardPeriodicTasks } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor(private httpc:HttpClient) { }
  readonly baseURL='http://localhost:39404/api/';
  public LstGenders = [
    {GenderCode:'0',GenderName:'-- Select --'}
  ];
  public LstCountries = [
    {CountryCode:'0',CountryName:'-- Select --'}
  ];
  public LstCities = [
    {CityCode:'0',CityName:'-- Select --'}
  ];
  getInitialData(){
    this.httpc.get(this.baseURL + 'DefaultData/InitFormData',{ }).subscribe((res:any)=>{
      this.LstGenders =res.dData.LstGenders;
      this.LstCountries =res.dData.LstCountries;
    },
    err=>{
      console.log(err);
    });
  }
  GetCitiesByCountryCode(CountryCode:any){
    let model = {
      CountryCode:CountryCode
    }
    this.httpc.post(this.baseURL + 'DefaultData/GetCities',model).subscribe((res:any)=>{
      debugger;
      this.LstCities =res.LstCities;
    },
    err=>{
      console.log(err);
    });
  }
}
