import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-school-lists',
  templateUrl: './school-lists.component.html',
  styleUrls: ['./school-lists.component.css']
})
export class SchoolListsComponent {
  searchControl = new FormControl('');
  schoolLists :any
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0; 
  totalPagesArray:any;
  isLoading:boolean = true;

  constructor(private userService:UserService, private router:Router){}

  ngOnInit(): void {
    this.loadSchools()

    this.searchControl.valueChanges
      .pipe(
        debounceTime(400), 
        distinctUntilChanged() 
      )
      .subscribe((searchTerm) => {
        console.log(searchTerm,' search term  mmmmm');
        this.loadSchools(this.currentPage, this.pageSize, searchTerm);
      });
  }

  loadSchools(page:number=1,pageSize:number=10,searchTerm:string |null=''): void {
    if(searchTerm){
      this.userService.getSchools({page,pageSize,searchTerm }).subscribe({
        next: (res:any) => {
          console.log(res);
          this.schoolLists = res.schools;
          this.totalPages = Math.ceil(res.totalCount / this.pageSize);
          this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);

        },
        error: (err:HttpErrorResponse) => {
          console.log(err);
          this.schoolLists = null
        }
      });
    }else{
      this.userService.getSchools({page,pageSize }).subscribe({
        next: (res:any) => {
          console.log(res);
          this.schoolLists = res.schools;
          this.totalPages = Math.ceil(res.totalCount / this.pageSize);
          this.totalPagesArray = Array.from({ length: this.totalPages }, (_, i) => i + 1);
          this.isLoading = false
        },
        error: (err:HttpErrorResponse) => {
          console.log(err);
          this.schoolLists = null
        }
      });
    }
  }

  onPageChange(page: number): void {
    console.log(page,'page number');
    this.loadSchools(page,this.pageSize)
  }
  onViewSchool(id:String){
    console.log(id,' idddd');
    this.router.navigate(['/prospect',{schoolId:id}])
  }
}
