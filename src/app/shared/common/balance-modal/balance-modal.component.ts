import { Component, OnInit } from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CounterService } from '../../service/counter.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-balance-modal',
  templateUrl: './balance-modal.component.html',
  styleUrls: ['./balance-modal.component.css']
})
export class BalanceModalComponent implements OnInit {
  name:any;
  existingBalance:any = 0;
  balanceForm:FormGroup = new FormGroup({});

  counternumber:any;
  uniqkey:any;
  countername:any;

  constructor(public activeModal: NgbActiveModal, private counterService:CounterService) { }

  ngOnInit(): void {
    this.balanceForm.addControl('balance',new FormControl('', Validators.required))
  }

  closeModal(){
    this.activeModal.close();
  }

  addMinusBalance(operator:boolean){
    if(this.balanceForm.valid) {          
      this.counterService.addMinusBalance(this.balanceForm.value.balance,this.counternumber,this.uniqkey,operator).subscribe((e:any)=>{
        if(e.hasOwnProperty('Success') && e.Success) {
          this.activeModal.close(e.Message);          
        }
      })
    }else {
      Swal.fire({
        title: 'Add Balance',
        text: "Add balance first",
        icon: 'info',
        confirmButtonText: 'Ok'
      })
    }
  }

}
