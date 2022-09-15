import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CounterService } from '../../shared/service/counter.service';

declare var pusher:any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  counters:Array<any> = [];
  balanceAskingCounterArray:Array<any> = [];

  constructor(private counterService:CounterService, private changeDetection:ChangeDetectorRef){
    this.getCounterList();    
    var channel = pusher.subscribe('my-channel');
    var self = this;
    channel.bind('my-event', function(data:any) {
      let result = JSON.parse(data.value);
      self.balanceAskingCounterArray.push(result);
      self.checkCounterAskingBalance(self.counters,self.balanceAskingCounterArray)    
    });

    var channel = pusher.subscribe('timerChanel');
    channel.bind('newSpin', function(data:any) {
      console.log("BOMBA GORER RAJA");
    })
    var betWinChannel = pusher.subscribe('betWinChannel');
    betWinChannel.bind('win', function(data:any) {
      console.log(JSON.parse(data));
      if(JSON.parse(data) && JSON.parse(data).hasOwnProperty("counterNumber"))
      self.changeCounterBalance(JSON.parse(data).counterNumber,JSON.parse(data).total,JSON.parse(data).profit);
    });
    betWinChannel.bind('placeBet', function(data:any) {
      console.log(data);    
      if(data.hasOwnProperty('total') && data.hasOwnProperty('counterNumber')) {
        self.changeCounterBalance(data.counterNumber,data.total,data.total, data.lastBalance)
      }
    });    
  }
  changeCounterBalance(counterNumber:any, total:any,profit:any,balance?:any) {
    if(this.counters.length > 0) {
      this.counters.forEach((e:any)=>{
        if(e.number == counterNumber) {
          e.totalBet = total;
          e.balance = balance?balance:e.balance;
          e.profit = profit;
          this.changeDetection.detectChanges();
        }
      })
    };
  }
  checkCounterAskingBalance(counterArray:Array<any>,balanceCounterArray:Array<any>){  
    if(counterArray.length > 0 && balanceCounterArray.length > 0){
      counterArray.forEach((e:any,i:any)=>{
        balanceCounterArray.forEach((e2:any)=>{
          if(e.uniqkey == e2.uniqKey) {
            e.askingbalance = true;
            this.changeDetection.detectChanges();
          }
        })
      })
    }else{
      return
    }
  }

  getCounterList(){
    this.counterService.getCounterList().subscribe((data:any)=>{
      // this.counters
      console.log(data);   
      if(data.hasOwnProperty('Success') && data.Success) {
        this.counters = data.Counter;
      }        
    }) 
  }

  ngOnInit(): void {
  }
  addMinusBalance(){
    this.getCounterList();
  }

}
