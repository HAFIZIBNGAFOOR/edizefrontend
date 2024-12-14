import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-contract-signed-view',
  templateUrl: './contract-signed-view.component.html',
  styleUrls: ['./contract-signed-view.component.css']
})
export class ContractSignedViewComponent {
  schoolId!:string 
  singleSchool :any
  isLoading:boolean=true
constructor(private route:ActivatedRoute, private userService:UserService, private router:Router){}

   ngOnInit() {
    this.route.params.subscribe(params => {
      this.schoolId = params['schoolId'];
      if(this.schoolId){
        const id = this.schoolId
        this.userService.getSingleSchool({id}).subscribe({
          next:(school)=>{
            console.log(school);
            this.isLoading = false
            this.singleSchool = school
          },
          error:(err:HttpErrorResponse)=>{
            this.isLoading = false
            this.singleSchool = null
            console.log(err,' error ');
            
          }
        })
      }
    })
  }
  navigateTo(path:string){
    this.router.navigate([`/${path}`,{schoolId:this.schoolId}])
  }
  viewScanCopy(): void {
    if (this.singleSchool && this.singleSchool.Contract_signed_copy) {
      console.log(this.singleSchool.Contract_signed_copy,' urlll');
      window.open(this.singleSchool.Contract_signed_copy, '_blank');
    } else {
      console.error('No PO scan copy URL found.');
    }
  }
}
