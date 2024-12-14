import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-school-detail',
  templateUrl: './school-detail.component.html',
  styleUrls: ['./school-detail.component.css']
})
export class SchoolDetailComponent {

  form: FormGroup;
  submitLoader:boolean = false
  constructor(private fb:FormBuilder, private userService:UserService ,private toasterService:ToastrService, private router:Router){
    this.form = this.fb.group({
      school_name: ['', Validators.required],
      Address: ['', Validators.required],
      district: ['', Validators.required],
      udise: ['', Validators.required],
      phone: ['', Validators.required],
      state: ['', Validators.required]
    })
  }

  onSubmit(){
    if(this.form.valid){
      console.log('validation success');
      const formData = this.form.value
      console.log(formData,' this is form data');
      this.submitLoader = true
      this.userService.addSchool(formData).subscribe({
        next:(res)=>{
          console.log(res,' response on success');
          this.submitLoader = false
          this.form.reset()
          this.toasterService.success('School added successfully',' Success')
          setTimeout(()=>{
            this.router.navigate(['/schools'])
          },3000)
        },
        error:(err:HttpErrorResponse)=>{
          this.submitLoader = false
          console.log(err, ' error from backend');
          this.toasterService.error(err.error.message,'Server Error')
        }
      })
    }else{
      console.log('validation error ');
      this.toasterService.error('Please fill all the fields','Validation Error')
    }
  }

}
