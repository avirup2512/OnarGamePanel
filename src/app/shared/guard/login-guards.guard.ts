import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardsGuard implements CanLoad {
  constructor(private router: Router) {}  
  canLoad(route: Route): boolean {      
    return true;
  }  
  
}
