import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpParams } from '@angular/common/http';
import {environment} from '../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }
  REST_API = environment.baseURL;

  httpHeaders = new HttpHeaders().set('Content-type','application/json');

  getUsers(){
    return this.http.get(this.REST_API + 'users',{headers:this.httpHeaders});
  }
  getUsersById(id:any){
    return this.http.get(this.REST_API + 'users/'+id,{headers:this.httpHeaders})
  }

  postUsers(data:any){
    return this.http.post(this.REST_API+'users',data,{headers:this.httpHeaders});
  }

  deleteUsers(id:any){
    return this.http.delete(this.REST_API+'users/'+id,{headers:this.httpHeaders});
  }

  updateUsers(id:any,data:any){
    return this.http.put(this.REST_API+'users/'+id,data,{headers:this.httpHeaders})
  }

  searchUser(searchQuery: any){
    const param = new HttpParams().append('first_name',searchQuery)
    return this.http.get(this.REST_API+'search/user',{params: param})
  }

  getUsersPage(pageNo: any){
    const param = new HttpParams().append('page',pageNo)
    return this.http.get(this.REST_API+'users',{params: param})
  }
}
