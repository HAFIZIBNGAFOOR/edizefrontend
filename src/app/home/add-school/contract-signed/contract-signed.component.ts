import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-contract-signed',
  templateUrl: './contract-signed.component.html',
  styleUrls: ['./contract-signed.component.css']
})
export class ContractSignedComponent {
  form: FormGroup;
  schoolId!:string
  submitLoader:boolean = false
  fileToUpload!:File
  constructor(private fb:FormBuilder, private userService:UserService ,private toasterService:ToastrService, private route:ActivatedRoute, private router:Router){
    this.form = this.fb.group({
      Boarding_meeting_date: ['', Validators.required],
      Boarding_student_count:['', Validators.required],
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.schoolId = params['id'];
    });
  }

  handleFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    console.log(target, ' target');
    const files = target.files;
    if (files && files.length > 0) {
      console.log(files, ' files', files.item(0));
      this.fileToUpload = files.item(0) as File;
      
    }
  }

  onSubmit(){
    if(this.form.valid){
      const formData = new FormData()
      formData.append('file',this.fileToUpload,this.fileToUpload.name)
      formData.append('Boarding_meeting_date',this.form.get('Boarding_meeting_date')?.value)
      formData.append('Boarding_student_count',this.form.get('Boarding_student_count')?.value)
      formData.append('schoolId',this.schoolId)

      console.log(formData,' this is form data');
      this.submitLoader = true
      this.userService.addContractSigned(formData).subscribe({
        next:(res)=>{
          console.log(res,' response on success');
          this.submitLoader = false
          this.toasterService.success('Contract signed data saved successfully', 'Success')
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
