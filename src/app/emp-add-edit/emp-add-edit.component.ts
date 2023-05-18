import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeService } from '../services/employee.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.css']
})
export class EmpAddEditComponent implements OnInit{
  empForm: FormGroup

  education:string[] = [
    'SSC',
    'Diploma',
    'Itermediate',
    'Graduate',
    'Post Graduate'
  ];

  constructor(private _fb:FormBuilder, private _empService:EmployeeService, private _dialogRef:MatDialogRef<EmpAddEditComponent>,@Inject(MAT_DIALOG_DATA) public data:any){
    this.empForm = this._fb.group({
      firstName:'',
      lastName:'',
      email:'',
      dob:'',
      gender:'',
      education:'',
      company:'',
      experience:'',
      packages:''
    })
  }
  ngOnInit() {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit(){
    if(this.empForm.valid){
      if(this.data){
        this._empService.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val:any) =>{
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
          })
          Toast.fire({
              icon: 'success',
              title: 'Employee Details Updated'
          })
            this._dialogRef.close(true)
          },
          error: (err:any) => {
            console.error(err)
          }
        })
      } else{
        this._empService.addEmployee(this.empForm.value).subscribe({
          next: (val:any) =>{
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
          })
          Toast.fire({
              icon: 'success',
              title: 'Employee Added Successfully'
          })
            this._dialogRef.close(true)
          },
          error: (err:any) => {
            console.error(err)
          }
        })
      }
      
    }
  }
}
