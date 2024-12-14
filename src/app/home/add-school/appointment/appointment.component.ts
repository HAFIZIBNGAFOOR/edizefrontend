import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  form: FormGroup;
  schoolId!:string;
  submitLoader:boolean = false
  constructor(private fb:FormBuilder, private userService:UserService ,private toasterService:ToastrService, private router:Router, private route:ActivatedRoute){
    this.form = this.fb.group({
      KDM_Designation: ['', Validators.required],
      KDM_Name: ['', Validators.required],
      KDM_Mobile_Number: ['', Validators.required],
      KDM_Meeting_time: ['', Validators.required],
      city_of_school: ['', Validators.required],
    })
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params['id'],'schoolid');
      this.schoolId  = params['id'];
    });
}
  onSubmit(){
    if(this.form.valid){
      console.log('validation success');
      const formData = this.form.value
      formData.schoolId = this.schoolId
      console.log(formData,' this is form data');
      this.submitLoader = true
      this.userService.addAppointment(formData).subscribe({
        next:(res)=>{
          this.submitLoader = false
          console.log(res,' response on success');
          this.toasterService.success('KDM Details entered success')
          setTimeout(()=>{
            this.router.navigate(['/schools'])
          },3000)
        },
        error:(err:HttpErrorResponse)=>{
          this.submitLoader = false
          console.log(err, ' error from backend');
          this.toasterService.error(err.message,'Server Error')
        }
      })
    }else{
      console.log('validation error ');
      this.toasterService.error('Please fill all the fields','Validation Error')
    }
  }

}
