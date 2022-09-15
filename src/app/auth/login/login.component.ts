import { Component, OnInit } from '@angular/core';
import { FormArray , FormGroup , FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/service/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup = new FormGroup({})

  constructor(private router:Router, private userService:UserService) {
    this.loginForm.addControl('email',new FormControl('', Validators.required))
    this.loginForm.addControl('password',new FormControl('', Validators.required))
   }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.loginForm) {
      this.userService.login(this.loginForm.value).subscribe((e:any)=>{
        if(e.hasOwnProperty('Success') && e.Success && e.hasOwnProperty('JWTToken') && e.JWTToken.length > 0) {
          localStorage.setItem('JWTToken',e.JWTToken);
          localStorage.setItem('isLogin', 'true');
          this.router.navigate(['dashboard'])
        }else{
          Swal.fire({
            title: 'Error!',
            text: 'Wrong Credentials',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        } 
      })
    }    
  }
  gotToSignUp(){
    this.router.navigate(['createNew'])
  }

}
