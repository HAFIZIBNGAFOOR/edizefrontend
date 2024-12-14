import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-proposal-signed-view',
  templateUrl: './proposal-signed-view.component.html',
  styleUrls: ['./proposal-signed-view.component.css']
})
export class ProposalSignedViewComponent {
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

  viewScanCopy(): void {
    if (this.singleSchool && this.singleSchool.PO_scan_copy) {
      console.log(this.singleSchool.PO_scan_copy,' urlll');
      
      window.open(this.singleSchool.PO_scan_copy, '_blank');
    } else {
      console.error('No PO scan copy URL found.');
    }
  }
}
