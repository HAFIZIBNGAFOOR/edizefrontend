import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
import { v4 as uuidv4 }  from "uuid"

@Component({
  selector: 'app-proposal-signed',
  templateUrl: './proposal-signed.component.html',
  styleUrls: ['./proposal-signed.component.css']
})
export class ProposalSignedComponent {

  fileToUpload!: File 
  form: FormGroup;
  schoolId!: string
  urlString!:string
  submitLoader:boolean = false
  Classes:any;
  constructor(private fb: FormBuilder, private userService: UserService, private toasterService: ToastrService, private router: Router, private route: ActivatedRoute) {

    this.form = this.fb.group({
      price_for_classed: ['', Validators.required],
      total_deal_year1: ['', Validators.required],
      total_deal_year2: ['', Validators.required],
      total_deal_year3: ['', Validators.required],
      studentCount: this.fb.array([])
    });
  }
  get studentCountsArray(): FormArray {
    return this.form.get('studentCount') as FormArray;
  }

  // Populate the form array with the classes
  populateStudentCounts() {
    this.Classes.forEach((classNumber:any) => {
      this.studentCountsArray.push(this.fb.group({
        class: [classNumber],
        count: [null, Validators.required]
      }));
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.schoolId = params['id'];
    });
    this.userService.getClasses({schoolId:this.schoolId}).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.Classes = res
        this.populateStudentCounts();
      },
      error:(err:HttpErrorResponse)=>{
        console.log(err)  
      }
    })

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

  onSubmit() {
    if (this.form.valid) {
      const formData = new FormData()
      console.log(this.form.get('studentCount')?.value,' sfsffsf student countttt');
      
      formData.append('file',this.fileToUpload,this.fileToUpload.name,)
      formData.append('schoolId',this.schoolId)
      formData.append('price_for_classed', this.form.get('price_for_classed')?.value);
      formData.append('total_deal_year1', this.form.get('total_deal_year1')?.value);
      formData.append('total_deal_year2', this.form.get('total_deal_year2')?.value);
      formData.append('total_deal_year3', this.form.get('total_deal_year3')?.value);
      // formData.student_count = 
      this.form.get('studentCount')?.value.forEach((item:any, index:any) => {
        formData.append(`data[${index}][class]`, item.class);
        formData.append(`data[${index}][count]`, item.count);
      });

      this.submitLoader = true
      this.userService.addProposalSigned(formData).subscribe({
        next: (res) => {
          this.submitLoader = false
          this.toasterService.success('Proposal Signed Data saved successfully', 'Success')
          setTimeout(()=>{
            this.router.navigate(['/schools'])
          },3000)
        },
        error: (err: HttpErrorResponse) => {
          this.submitLoader = false
          this.toasterService.error(err.message, 'Server Error')
        }
      })
    } else {
      this.toasterService.error('Please fill all the fields', 'Validation Error')
    }
  }
}
