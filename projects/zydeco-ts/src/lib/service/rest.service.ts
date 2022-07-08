import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ObjectModel } from '../model/ObjectModel';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http : HttpClient) { }

  get(api:string, pathParams?: string[], queryParams?:{ key:string, value:any }[]):Observable<any> {
    return this.http.get(api + this.buildPathParams(pathParams) + this.buildQueryString(queryParams));
  }

  post(api:string, pathParams?: string[], payload?:ObjectModel):Observable<any> {
    return this.http.post(api + this.buildPathParams(pathParams), payload);
  }

  put(api:string, pathParams?: string[], payload?:ObjectModel):Observable<any> {
    return this.http.put(api + this.buildPathParams(pathParams), payload);
  }

  buildPathParams(pathParams?: string[]) {
    let result = "";
    if (pathParams != null) {
      pathParams.forEach(param => result += "/" + param);
    }
    return result;
  }

  buildQueryString(queryParams?:{ key:string, value:any }[]) {
    let queryString = "";
    if (queryParams != null) {
      if (queryParams.length > 0) queryString += "?";
      for (let i = 0; i < queryParams.length; i++) {
        queryString += queryParams[i].key + "=" + queryParams[i].value;
      }
    }
    return queryString;
  }
}
