import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/shared/api.service';
import { UserComponent } from '../user/user.component';
import { PageEvent } from '@angular/material/paginator';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  users : any = [];
  searchQuery: string = '';
  constructor(private _apiService: ApiService,
              private _snackBar: MatSnackBar,
              public dialog: MatDialog,
              ){}

  ngOnInit(): void {
      this.fetchUsers();   
  }

  fetchUsers(){
    this._apiService.getUsers().subscribe((res:any)=>{
      this.users = res;
      console.log(res['totalItems'])
    })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  openAddModal(){
    const dialogRef = this.dialog.open(UserComponent,{
      height: '450px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
     this.fetchUsers();
    });
  }

  updateUser(data:any){
    const dialogRef = this.dialog.open(UserComponent,{
      height: '450x',
      width: '600px',
      data : data
    });

    dialogRef.afterClosed().subscribe(result => {
     this.fetchUsers();
    });
  }

  deletUser(id:any){
    this._apiService.deleteUsers(id).subscribe((data)=>{
      this.openSnackBar('User Deleted Successfully','Dismiss');
      this.fetchUsers();
    })
  }

  searchUser(){
    this._apiService.searchUser(this.searchQuery).subscribe((data:any)=>{
      this.users = data;
      this.searchQuery ='';
      if(data.length==0){
        this.openSnackBar('User Not Found','Dismiss');
        this.fetchUsers();
      }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.fetchUsersPage(e.pageIndex+1);
  }

  fetchUsersPage(pageIndex:any){
    this._apiService.getUsersPage(pageIndex).subscribe((res)=>{
      this.users = res;
    })
  }
}
