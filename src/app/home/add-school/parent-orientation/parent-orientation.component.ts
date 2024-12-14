import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-parent-orientation',
  templateUrl: './parent-orientation.component.html',
  styleUrls: ['./parent-orientation.component.css']
})
export class ParentOrientationComponent {
  form: FormGroup;
  schoolId!:string
  submitLoader:boolean = false
  constructor(private fb:FormBuilder, private userService:UserService ,private toasterService:ToastrService, private route:ActivatedRoute, private router:Router){
    this.form = this.fb.group({
      PO_done_date: ['', Validators.required],
      Parent_Orientation_Done_By: ['', Validators.required],
      Parents_attended: ['', Validators.required],

    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.schoolId = params['id'];
    });
  }
  onSubmit(){
    if(this.form.valid){
      console.log('validation success');
      const formData = this.form.value
      formData.schoolId = this.schoolId
      console.log(formData,' this is form data');
      this.submitLoader = true
      this.userService.addParentOrientation(formData).subscribe({
        next:(res)=>{
          console.log(res,' response on success');
          this.submitLoader = false
          this.toasterService.success('Parent Orientation Data saved successfully',' Success')
          setTimeout(()=>{
            this.router.navigate(['/schools'])
          },3000)
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err, ' error from backend');
          this.submitLoader = false
          this.toasterService.error(err.message,'Server Error')
        }
      })
    }else{
      console.log('validation error ');
      this.toasterService.error('Please fill all the fields','Validation Error')
    }
  }
}
