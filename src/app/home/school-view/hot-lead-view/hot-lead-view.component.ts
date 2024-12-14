import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-hot-lead-view',
  templateUrl: './hot-lead-view.component.html',
  styleUrls: ['./hot-lead-view.component.css']
})
export class HotLeadViewComponent {
  singleSchool:any
  schoolId!:string
  isLoading:boolean = true
  constructor(private userService:UserService, private route:ActivatedRoute,private router:Router){
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.schoolId = params['schoolId'];
      if(this.schoolId){
        const id = this.schoolId
        this.userService.getSingleSchool({id}).subscribe({
          next:(school)=>{
            console.log(school);
            this.isLoading = false
            this.singleSchool = school;
            this.userService.updateSingleSchool(school)
          },
          error:(err:HttpErrorResponse)=>{
            console.log(err,' error ');
            this.isLoading = false
          }
        })
      }
    });

    this.userService.singleSchool$.subscribe((school) => {
      this.singleSchool = school;
    });
  }
  navigateTo(path:string){
    this.router.navigate([`/${path}`,{schoolId:this.schoolId}])
  }
}
