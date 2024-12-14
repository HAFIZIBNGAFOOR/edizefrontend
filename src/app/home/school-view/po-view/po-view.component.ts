import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-po-view',
  templateUrl: './po-view.component.html',
  styleUrls: ['./po-view.component.css']
})
export class POViewComponent {
  schoolId!:string 
  singleSchool :any
  isLoading :boolean = true
constructor(private route:ActivatedRoute, private userService:UserService, private router:Router){}

   ngOnInit() {
    this.route.params.subscribe(params => {
      this.schoolId = params['schoolId'];
      if(this.schoolId){
        const id = this.schoolId
        this.userService.getSingleSchool({id}).subscribe({
          next:(school)=>{
            this.singleSchool = school
            this.isLoading = false
          },
          error:(err:HttpErrorResponse)=>{
            this.isLoading = false
          }
        })
      }
    })
  }
  navigateTo(path:string){
    this.router.navigate([`/${path}`,{schoolId:this.schoolId}])
  }
}
