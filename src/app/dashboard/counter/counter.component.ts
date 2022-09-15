import { Component, OnInit, Input, Output, EventEmitter,ViewEncapsulation  } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { BalanceModalComponent } from '../../shared/common/balance-modal/balance-modal.component';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CounterComponent implements OnInit {


  counter_:any = {}
  @Input() set counter(value: Array<any>) {
    if(value){
      this.counter_ = value;
    }
  }
  @Input() counternumber:any;
  @Input() uniqkey:any;

  @Output() addBalance:EventEmitter<any> = new EventEmitter();

  constructor(private modalService:NgbModal, private router:Router) { }

  ngOnInit(): void {
  }

  openBalanceModal() {
    const modalRef = this.modalService.open(BalanceModalComponent);
    modalRef.componentInstance.counternumber = this.counternumber;
    modalRef.componentInstance.uniqkey = this.uniqkey;
    modalRef.componentInstance.existingBalance = this.counter_.balance;
    modalRef.componentInstance.countername = this.counter_.name;
    modalRef.closed.subscribe((e:any)=>{
      if(e){
        Swal.fire({
          title: 'Success!',
          text: e.Message,
          icon: 'success',
          confirmButtonText: 'Cool'
        });
        this.addBalance.emit('');
      }
    })
  }
  openDetails(counterNumber:any) {
    this.router.navigate(['/dashboard/counter-details',counterNumber])
  }

}
