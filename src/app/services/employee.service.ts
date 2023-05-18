import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http:HttpClient) { }

  addEmployee(data:any) : Observable<any>{
    return this._http.post('/.netlify/functions/server/api/employees',data)
  }

  getEmployees() : Observable<any>{
    return this._http.get('/.netlify/functions/server/api/employees')
  }

  updateEmployee(id:number, data:any) : Observable<any>{
    return this._http.put(`/.netlify/functions/server/api/employees/${id}`,data)
  }

  deleteEmployee(id:number) : Observable<any>{
    return this._http.delete(`/.netlify/functions/server/api/employees/${id}`)
  }
}
