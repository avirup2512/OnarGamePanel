import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { LoginGuardsGuard } from './shared/guard/login-guards.guard';

const routes: Routes = [{path:'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule), canLoad:[LoginGuardsGuard]},
{path:'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)},
{path:'', redirectTo:'login', pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
