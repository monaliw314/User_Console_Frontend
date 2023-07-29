import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from 'src/shared/api.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  public addUserForm! : FormGroup
  dataToUpdate : any ;
  title : string ='Add User';
  constructor(private formBuilder: FormBuilder,
              private _apiService: ApiService,
              private _snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<UserComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {data: any}){}

  ngOnInit(){
    this.createAddItemForm();
    if(this.data){
      this.title ='Update User';
      this.dataToUpdate = this.data 
      this.addUserForm.patchValue(this.data);
    }   
  }
  
  get addUserFormControl(){
    return this.addUserForm.controls;
  }

  private createAddItemForm(){
    this.addUserForm = this.formBuilder.group({
      first_name : ['', Validators.required],
      last_name  : ['', Validators.required],
      email      : ['', [Validators.required,Validators.email]],
    });
  }

  addUser(){
    const data = JSON.stringify(this.addUserForm.value);
    this._apiService.postUsers(data).subscribe((data)=>{
      this.dialogRef.close();
      this.openSnackBar('User Added Successfully','Dismiss');
    })
  }

  updateUser(){
    let data = JSON.stringify(this.addUserForm.value);
    this._apiService.updateUsers(this.dataToUpdate._id,data).subscribe((data)=>{
      this.dialogRef.close();
      this.openSnackBar('User Updated Successfully','Dismiss');
    })
  }

  userOperations(){
    if(this.data) this.updateUser();
    else this.addUser();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
