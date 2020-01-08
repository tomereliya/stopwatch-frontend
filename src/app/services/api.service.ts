import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  urlBase : string = environment.urlBase;

  constructor(private http: HttpClient) {

  }

  addTime = (time: string) : Observable<string> => {
    return this.http.post(this.urlBase + "/api/add?time=" + time,null, {responseType: 'text'})
  };

  resetTime = () : Observable<Object> => {
    return this.http.delete(this.urlBase + "/api/remove");
  };

  removeTime = (time: string) : Observable<Object> => {
    return this.http.delete(this.urlBase + "/api/remove?time=" + time);
  };

  getTimes = (userId: string) : Observable<Object> => {
    return this.http.get(this.urlBase + "/api/times/"+userId);
  };



}
