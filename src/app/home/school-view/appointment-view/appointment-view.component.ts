import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-appointment-view',
  templateUrl: './appointment-view.component.html',
  styleUrls: ['./appointment-view.component.css']
})
export class AppointmentViewComponent {
  singleSchool:any
  schoolId!:string
  isLoading:boolean =true;
  constructor(private userService:UserService, private route:ActivatedRoute,private router:Router){
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.schoolId = params['schoolId'];
      if(this.schoolId){
        const id = this.schoolId
        this.userService.getSingleSchool({id}).subscribe({
          next:(school)=>{
            this.isLoading = false
            console.log(school);
            this.singleSchool = school
          },
          error:(err:HttpErrorResponse)=>{
            this.isLoading = false
            this.singleSchool = null
            console.log(err,' error ');
          }
        })
      }
    });
  }
  navigateTo(path:string){
    this.router.navigate([`/${path}`,{schoolId:this.schoolId}])
  }
}
