import { Component, OnInit } from '@angular/core';
import { CounterService } from '../../shared/service/counter.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-counter-details',
  templateUrl: './counter-details.component.html',
  styleUrls: ['./counter-details.component.css']
})
export class CounterDetailsComponent implements OnInit {

  countersProfitLoss:Array<any> = [];
  counterNumber:any;
  constructor(private counterService:CounterService,private route:ActivatedRoute) {

    
   }

  ngOnInit(): void {
    this.counterNumber = this.route.snapshot.params['id'];
    if(this.counterNumber)
    this.counterService.getCounterProfitLoss(this.counterNumber)
    .subscribe((e:any)=>{
      console.log(e);   
      if(e.hasOwnProperty('Success') && e.Success && e.ProfitLoss.length > 0) {
       this.countersProfitLoss =  e.ProfitLoss
      }   
    })
  }

}
