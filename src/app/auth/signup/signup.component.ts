import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  error!:string
  form:FormGroup;
  managers:any;
  ngOnInit(): void {
      this.userService.getManagers().subscribe({
        next:(res)=>{
          this.managers = res
          console.log(res);
          
        },
        error:(err:HttpErrorResponse)=>{
          this.error = err.error.message
          this.toastrService.error(err.error.message,'Server Error')
        }
      })
  }
  constructor(private fb:FormBuilder, private toastrService:ToastrService, private userService:UserService, private router:Router ){
    this.form = this.fb.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      district:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      password:['',Validators.required],
      manager:['',Validators.required]
    })
  }
  onSubmit(){
    if(this.form.valid){
      const formData = this.form.value;
      this.userService.signup(formData).subscribe({
        next:(res)=>{
          this.toastrService.success('Account created successfully','Success')
          setTimeout(()=>{
            this.router.navigate(['/login'])
          },3000)
        },
        error:(err:HttpErrorResponse)=>{
          this.error = err.error.message
          this.toastrService.error(err.error.message,'Server Error')
        }
      })
    }else{
      this.toastrService.error('Please fill all the fields with valid data', 'Validation Error')
    }
  }
}
