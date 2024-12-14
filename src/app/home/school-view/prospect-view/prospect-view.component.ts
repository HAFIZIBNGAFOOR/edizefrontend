import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-prospect-view',
  templateUrl: './prospect-view.component.html',
  styleUrls: ['./prospect-view.component.css']
})
export class ProspectViewComponent {

  schoolId!: string;
  singleSchool: any;
  originalSchool: any;
  isLoading: boolean = true;
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.schoolId = params['schoolId'];
      if (this.schoolId) {
        const id = this.schoolId;
        this.userService.getSingleSchool({ id }).subscribe({
          next: (school) => {
            this.singleSchool = school;
            this.isLoading = false;
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error fetching school:', err);
            this.isLoading = false;
          }
        });
      }
    });

    this.userService.singleSchool$.subscribe((school) => {
      this.singleSchool = school;
    });
  }

  enableEditMode() {
    this.isEditMode = true;
    this.originalSchool = { ...this.singleSchool }; // Backup current state
  }

  saveChanges() {
    if (!this.schoolId || !this.singleSchool) {
      return;
    }

    // this.userService.updateSingleSchool({ id: this.schoolId, ...this.singleSchool }).subscribe({
    //   next: () => {
    //     this.isEditMode = false;
    //     console.log('School details updated successfully');
    //   },
    //   error: (err: HttpErrorResponse) => {
    //     console.error('Error updating school:', err);
    //     // Optionally, revert changes if save fails
    //     this.cancelEdit();
    //   }
    // });
  }

  cancelEdit() {
    this.isEditMode = false;
    this.singleSchool = { ...this.originalSchool }; // Restore original state
  }

  navigateTo() {
    this.router.navigate(['/appointment', { schoolId: this.schoolId }]);
  }
}
