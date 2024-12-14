import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isMenuOpen:boolean=true
  dashboardData:any
  Account:any
  toggleMenu(){
    this.isMenuOpen = !this.isMenuOpen
  }
  constructor(private route:Router, private userService:UserService){}
  
  redirect(){
    this.route.navigateByUrl('/add-schools')
  }
  
}
