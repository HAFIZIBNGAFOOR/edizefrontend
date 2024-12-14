import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-add-school',
  templateUrl: './add-school.component.html',
  styleUrls: ['./add-school.component.css']
})
export class AddSchoolComponent {
  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.userService.getSchools({}).subscribe({
      next:(res)=>{
        console.log(res,' response ');
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err,' this is error'); 
      }
    })
  }
}
