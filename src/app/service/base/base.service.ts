import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  invalidateCacheParam: any;
  defaultGetParams: any;
  headers: any;

  constructor( private http: HttpClient) { }

  generateArray(obj) {
    return Object.keys(obj).map((key) => {
      return {key: key, value: obj[key]};
    });
  }

  getQueryParamString(queryParamObj: any) {
    const queryObj = Object.assign({}, this.invalidateCacheParam, this.defaultGetParams, queryParamObj);
    const queryParamArr = this.generateArray(queryObj);
    let arrayParam = '';

    Object.entries(queryParamObj).forEach((item) => {
      //console.log(item);
      if (Array.isArray(item[1])) {
        arrayParam = item[0] + '=' + item[1].join('&' + item[0] + '=');
        arrayParam += '&';
        return false;
      }
      arrayParam = arrayParam + item[0] + '=' + item[1] + '&';
    });
    arrayParam = arrayParam.slice(0, -1);
    //console.log(arrayParam);
    return arrayParam;
  }

  doPost(url: string, parameters: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      // 'Authorization': this.getAuthorizationKey()? this.getAuthorizationKey() : ''
    });
    return this.http.post(url, parameters, {headers: headers});
  }

  doGet(url: string, params?: any, headers?: Map<string, string>, body?: object) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        //'Authorization': this.getAuthorizationKey()
      })
    };
    if (params) {
      url += '?' + this.getQueryParamString(params);
      //console.log(url);
    }
    return this.http.get(url, httpOptions);
  }

  doPut(url, parameters: any) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
      //'Authorization': this.getAuthorizationKey()
    });
    return this.http.put(url, parameters, {headers: headers});
  }

  doDelete(url: string, params?: any, body?: any, headers?: Map<string, string>) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
        //'Authorization': this.getAuthorizationKey()
      })
    };
    return this.http.delete(url , httpOptions);
  }
}
