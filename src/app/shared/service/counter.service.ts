import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterService {

  baseUrl:string = environment.baseUrl; 
  headers:HttpHeaders = new HttpHeaders();

  constructor(private http:HttpClient) {
    if(localStorage.getItem('JWTToken')){
      let JWTToken:any = localStorage.getItem('JWTToken');
      console.log(JWTToken)
      this.headers = this.headers.append('Authorization', JWTToken)
    }    
   }

  getCounterList(){
    console.log(this.headers);
    return this.http.get(this.baseUrl+'counter/getCounterList',{headers:this.headers});
  }

  startTimer(){
    let observable:Observable<String> = new Observable(observer =>{
      observer.next("hh");
      observer.complete();
    });
    observable.subscribe(m =>{
      console.log(m);
    })

    return this.http.get(this.baseUrl+'counter/startTimer');
  }

  addMinusBalance(balance:any,counternumber:any,uniqkey:any,operator:boolean) {
    var data = new FormData();
    data.append("balance",balance);
    data.append("counternumber",counternumber);
    data.append('uniqkey',uniqkey)
    data.append('operator',operator?"+":"-");
    return this.http.post(this.baseUrl+'counter/giveBalance',data,{headers:this.headers});
  }
  addUser(data:any){
    var formData = new FormData();
    formData.append("email",data.email);
    formData.append("password",data.password);
    formData.append("otp",data.otp);
    return this.http.post(this.baseUrl+'user/addUser',formData);
  }

  getCounterProfitLoss(counterNumber:any){
    var formData = new FormData();
    formData.append("counternumber",counterNumber);
    return this.http.post(this.baseUrl+'counter/getCounterProfitLossByCounterId',formData,{headers:this.headers});
  }
}
