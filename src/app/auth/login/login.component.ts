import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { iToken } from 'src/app/models/token.model';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form:FormGroup;

   constructor(private fb:FormBuilder, private toastrService:ToastrService,private userService:UserService, private router:Router){
    this.form = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
   }

   onSubmit(){
    if(this.form.valid){
      const formData= this.form.value;
      this.userService.login(formData).subscribe({
        next:(res:any)=>{
          console.log(res,' response from login see');
          this.userService.setToken(res.accessToken as string)
          this.router.navigate(['/dashboard'])
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err, ' error  from backedn');
          this.toastrService.error(err.error.message,'Error')
        }
      })
    }else{
      this.toastrService.error('Please fill all fields with valid details','Validation Error')
    }
   }
}
