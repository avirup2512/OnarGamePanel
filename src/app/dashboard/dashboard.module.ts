import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from '../shared/common/header/header.component';
import { CounterComponent } from './counter/counter.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameInfoComponent } from './game-info/game-info.component';
import { CounterDetailsComponent } from './counter-details/counter-details.component';

@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    CounterComponent,
    GameInfoComponent,
    CounterDetailsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgbModule
  ]
})
export class DashboardModule { }
