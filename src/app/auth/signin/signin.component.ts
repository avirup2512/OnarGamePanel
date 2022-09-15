import { Component, OnInit } from '@angular/core';
import { FormArray , FormGroup , FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { CounterService } from '../../shared/service/counter.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  otpGenerated:boolean = false;
  otpTimerRunning:boolean=false;
  signUpForm:FormGroup = new FormGroup({});
  minute:any;
  second:any;
  setTimer:any;

  constructor(private counter:CounterService, private router:Router) {
    
    
   }
timerOn = true;

 timer(remaining:any) {
  let self = this;
  this.minute = Math.floor(remaining / 60);
  this.second = remaining % 60;  
  this.minute = this.minute< 10 ? '0' + this.minute : this.minute;
  this.second = this.second < 10 ? '0' + this.second : this.second;
  remaining -= 1;
  
  if(remaining >= 0 && this.timerOn) {
  this.setTimer = setTimeout(function() {
      self.timer(remaining);
    }, 1000);
    return;
  }else{
    this.otpTimerRunning = false;
    Swal.fire({
      title: 'Error!',
      text: 'OTP Time out. Generate OTP Again',
      icon: 'error',
      confirmButtonText: 'Cool'
    })
  }
  if(!this.timerOn) {
    // Do validate stuff here    
    return;
  };  
}

resetTime(){
  this.minute = 0;
  this.second =0;
  this.setTimer.clearTimeout()
}


  ngOnInit(): void {
    this.signUpForm.addControl('email',new FormControl('', Validators.required));
    this.signUpForm.addControl('password',new FormControl('', Validators.required));
    this.signUpForm.addControl('otp',new FormControl('', Validators.required));
    this.signUpForm.controls['otp'].valueChanges.subscribe(x => {
      this.otpTimerRunning = false;
      this.resetTime();
   })
  }

  onSubmit(){
    this.otpGenerated = true;
    this.counter.addUser(this.signUpForm.value)
    .subscribe((e:any)=>{
      console.log(e);
      if(e.hasOwnProperty('Success') && !e.Success) {
        Swal.fire({
          title: 'Error!',
          text: e.Message,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }else if(e.hasOwnProperty('Success') && e.Success){
        if(e.StartOtpTimer) {          
            this.generateOtp();         
        }
        Swal.fire({
          title: 'Success!',
          text: e.Message,
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        if(e.User && e.User.length > 0) {
          this.router.navigate(['login'])
        }
      }
    })
    // this.router.navigate(['dashboard'])
  }
  generateOtp(){
    this.otpTimerRunning = true;
    this.timer(120);
  }

}
