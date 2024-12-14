import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent {
  schoolId!:string 
  singleSchool :any
  isLoading:boolean = true
constructor(private route:ActivatedRoute, private userService:UserService, private router:Router){}

   ngOnInit() {
    this.route.params.subscribe(params => {
      this.schoolId = params['schoolId'];
      if(this.schoolId){
        const id = this.schoolId
        this.userService.getSingleSchool({id}).subscribe({
          next:(school)=>{
            console.log(school);
            this.singleSchool = school
            this.isLoading = false
          },
          error:(err:HttpErrorResponse)=>{
            console.log(err,' error ');
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
