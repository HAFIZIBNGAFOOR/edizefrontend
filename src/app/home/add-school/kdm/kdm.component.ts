import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-kdm',
  templateUrl: './kdm.component.html',
  styleUrls: ['./kdm.component.css']
})
export class KDMComponent {
  
  form: FormGroup;
  schoolId!: string
  submitLoader:boolean = false
  constructor(private fb: FormBuilder, private userService: UserService, private toasterService: ToastrService, private router: Router, private route: ActivatedRoute) {
    this.form = this.fb.group({
      Meeting_done_date: ['', Validators.required],
      demoOption: ['no'],
      Demo_schedule_date: ['', Validators.required],
      smartClassRooms:[false],
      smartStudio:[false],
      schoolInternet:[false]
    })
    this.form.get('demoOption')?.valueChanges.subscribe((value) => {
      const demoScheduleDateControl = this.form.get('Demo_schedule_date');
      if (value === 'yes') {
        demoScheduleDateControl?.enable();
        demoScheduleDateControl?.setValidators([Validators.required]);
      } else {
        demoScheduleDateControl?.disable();
        demoScheduleDateControl?.clearValidators();
      }
      demoScheduleDateControl?.updateValueAndValidity();
    });
    this.form.get('Demo_schedule_date')?.disable();

  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.schoolId = params['id'];
    });
  }
  toggleRadioButton(controlName: string) {
    const currentValue = this.form.get(controlName)?.value;
    this.form.get(controlName)?.setValue(!currentValue);
  }
  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value
      console.log(this.form.value);
      formData.schoolId = this.schoolId
      this.submitLoader =true
      console.log(formData,' form satattatt');
      
      this.userService.addKDM(formData).subscribe({
        next: (res) => {
          this.submitLoader =false
          this.toasterService.success('KDM Meeting Data saved successfully', 'Success')
          setTimeout(()=>{
            this.router.navigate(['/schools'])
          },3000)
          console.log(res, ' response on success');
        },
        error: (err: HttpErrorResponse) => {
          this.submitLoader =false
          this.toasterService.error(err.message, 'Server Error')
        }
      })
    } else {
      console.log(this.form.value,' valueeesssss');
      this.toasterService.error('Please fill all the fields', 'Validation Error')
    }
  }
}
