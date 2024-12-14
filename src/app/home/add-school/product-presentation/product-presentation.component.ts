import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-product-presentation',
  templateUrl: './product-presentation.component.html',
  styleUrls: ['./product-presentation.component.css']
})
export class ProductPresentationComponent {
  form: FormGroup;
  schoolId!:string
  submitLoader:boolean = false;

  constructor(private fb:FormBuilder, private userService:UserService ,private toasterService:ToastrService,private route:ActivatedRoute, private router:Router){
    this.form = this.fb.group({
      participated_members: this.fb.array([]),
      demo_done_date: [null, Validators.required],
      further_requirement: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.schoolId = params['id'];
    });
  }

  onCheckboxChange(e:any) {
    const checkArray: FormArray = this.form.get('participated_members') as FormArray;
  
    if (e.target.checked) {
      checkArray.push(this.fb.control(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }
  
    onSubmit(){
      if(this.form && this.form.valid){
        const formData = this.form.value
        formData.schoolId = this.schoolId
        this.submitLoader= true
        console.log(this.form.value,' fprm valuessss');
        
        this.userService.addProductPresentation(formData).subscribe({
          next:(res)=>{
            this.submitLoader= false
            this.toasterService.success('Product presentation data added','Success')
            setTimeout(()=>{
              this.router.navigate(['/schools'])
            },3000)
          },
          error:(err:HttpErrorResponse)=>{
            this.submitLoader= false
            console.log(err, ' error from backend');
            this.toasterService.error(err.message,'Server Error')
          }
        })
      }else{
        console.log('validation error ', this.form.value);
        this.toasterService.error('Please fill all the fields','Validation Error')
      }
  }






// createMemberField(): FormGroup {
//     return this.fb.group({
//         memberName: ['', Validators.required],
//     });
// }

// addMemberField(): void {
//     const membersArray = this.form.get('participated_members') as FormArray;
//     if (membersArray) {
//       membersArray.push(this.createMemberField());
//   }
// }


// getParticipatedMembersControls(): AbstractControl[] {
//     return (this.form.get('participated_members') as FormArray).controls;
// }

// getMemberNameControl(index: number): AbstractControl|null {
//   const controlArray = this.form.get('participated_members') as FormArray;
//   if (controlArray && controlArray.controls[index]) {
//       return controlArray.controls[index].get('memberName');
//   }
//   return null;}
//   removeMemberField(index: number): void {
//     const membersArray = this.form.get('participated_members') as FormArray;
//     if (membersArray && membersArray.length > 1) { // Ensure there is at least one member left
//         membersArray.removeAt(index);
//     }
// }

}
