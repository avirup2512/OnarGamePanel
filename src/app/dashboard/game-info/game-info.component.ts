import { Component, OnInit, OnDestroy ,HostListener, ChangeDetectorRef} from '@angular/core';
import {timer, Subscription, Observable,map,share,fromEvent} from 'rxjs';
import {AppConstant} from '../../shared/app.constant';
declare var pusher:any;

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.css']
})
export class GameInfoComponent implements OnInit, OnDestroy {
  gameStateText:any = 'Last session is running';
  time:any = 91;
  winNumber:any;
  winningCombination:any;
  @HostListener('window:beforeunload')
  async ngOnDestroy()
  {
    localStorage.removeItem('sessionStart');
    localStorage.removeItem('newSpin');
  }

  constructor(private changeDetecRef:ChangeDetectorRef) { }

  ngOnInit(): void {
    let self = this;
    var channel = pusher.subscribe('timerChanel');
    channel.bind('sessionStart', (data:any)=> {   
      this.winningCombination = {};
      this.gameStateText = "Betting";
      this.changeDetecRef.detectChanges();
    })
    channel.bind('noBet', (data:any)=> {         
      this.gameStateText = 'Spinning';
      this.changeDetecRef.detectChanges();
    })
    channel.bind('newSpin', (data:any)=> {   
      this.winNumber = data[1]; 
      this.checkWinCombination(this.winNumber);
      this.gameStateText = 'Winner is: ';
      this.changeDetecRef.detectChanges();
    })
  }

  checkWinCombination(uniqCode:any){
    AppConstant.BettingArray.forEach((e:any)=>{
      if(e.uniqCode == uniqCode) {
        this.winningCombination = e;
      }
    })
  }
}
