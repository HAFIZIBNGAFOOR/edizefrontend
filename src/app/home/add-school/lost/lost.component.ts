import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: ['./lost.component.css']
})
export class LostComponent {
  form: FormGroup;
  schoolId!:string
  submitLoader:boolean = false
  constructor(private fb:FormBuilder, private userService:UserService ,private toasterService:ToastrService, private route:ActivatedRoute,private router:Router){
    this.form = this.fb.group({
      remarks: ['', Validators.required],
      next_year_prospect: ['', Validators.required],
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
      this.userService.addLost(formData).subscribe({
        next:(res)=>{
          console.log(res,' response on success')
          this.submitLoader = false;
          this.form.reset()
          this.toasterService.success('School has Lost',' Success')
          setTimeout(()=>{
            this.router.navigate(['/schools'])
          },3000)
        },
        error:(err:HttpErrorResponse)=>{
          this.submitLoader = false;
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
