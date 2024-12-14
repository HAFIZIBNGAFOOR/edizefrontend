import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-school-view',
  templateUrl: './school-view.component.html',
  styleUrls: ['./school-view.component.css']
})
export class SchoolViewComponent {

  schoolId !: string
  singleSchool !: string
  Account!:string
  constructor(private route:ActivatedRoute, private userService:UserService){} 

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.schoolId = params['schoolId'];
      if(this.schoolId){
        const id = this.schoolId
        this.userService.getSingleSchool({id}).subscribe({
          next:(school)=>{
            console.log(school);
            this.userService.updateSingleSchool(school)
          },
          error:(err:HttpErrorResponse)=>{
            console.log(err,' error ');
          }
        })
      }
    });

    this.userService.singleSchool$.subscribe((school) => {
      this.singleSchool = school;
    });
  }
}
