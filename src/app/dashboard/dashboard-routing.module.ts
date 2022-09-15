import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CounterDetailsComponent } from './counter-details/counter-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{path:'', component:DashboardComponent},
{path:'counter-details/:id', component:CounterDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {


 }
