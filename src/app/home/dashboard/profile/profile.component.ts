import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  isEditing = false;
  user:any;
  form: FormGroup;
  constructor(private userService:UserService, private fb:FormBuilder, private router:Router){
    this.form = this.fb.group({
      first_name:['',Validators.required],
      last_name:['',Validators.required],
      district:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
    })
  }
  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next:(res)=>{
        console.log(res,' response after get');
        this.user = res
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err,' this is error');
      }
    })
  }

  toggleEditing(): void {
    this.isEditing = !this.isEditing;
  }



  cancelEditing(): void {
    // Reset input fields to original values
    this.isEditing = false;
  }
  onSubmit(){
    if(this.form.valid){
      const formData = this.form.value
      this.userService.putProfile(formData).subscribe({
        next:(res)=>{
          console.log(res,' response after put');
          
          this.user = res
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err,' this is error');
        }
      })
    }
    this.isEditing = false;
  }
  logout(){
    this.userService.removeToken();
    this.router.navigate(['/login'])
  }
}
