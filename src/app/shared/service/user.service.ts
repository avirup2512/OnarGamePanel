import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = environment.baseUrl; 

  constructor(private http:HttpClient) { }


  login(data:any) {
    var formData = new FormData();
    formData.append("email",data.email);
    formData.append("password",data.password);
    return this.http.post(this.baseUrl+'user/login',formData);
  }
  addUser(data:any){
    var formData = new FormData();
    formData.append("email",data.email);
    formData.append("password",data.password);
    return this.http.post(this.baseUrl+'user/addUser',formData);
  }
}

