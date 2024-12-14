import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  searchControl = new FormControl('');
  schoolLists :any
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 0; 
  totalPagesArray:any;
  dashboardData:any
  isLoading:boolean = true
  constructor(private userService:UserService){}

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
      this.userService.getDashboard().subscribe({
        next:(res)=>{
          this.dashboardData = res
          this.isLoading = false
        },
        error:(err:HttpErrorResponse)=>{
          console.log(err);
          
        }
      })
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

} 
