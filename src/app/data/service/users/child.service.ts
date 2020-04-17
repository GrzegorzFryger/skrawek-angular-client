import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../core/environment.dev';
import {Child} from '../../model/users/child';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(private http: HttpClient) { }

  getAllChildren(): Observable<Array<Child>> {
    return this.http.get<Array<Child>>(environment.apiUrls.account.child.children);
  }

  getCountChildren(): Observable<number> {
    return this.http.get<number>(environment.apiUrls.account.child.count);
  }

  public searchChildrenByFullName(name: string, surname: string): Observable<Array<Child>> {
    const params = new HttpParams().append('name', name).append('surname', surname);
    return this.http.get<Array<Child>>(environment.apiUrls.account.child.searchChildrenByFullName, {params});
  }
}
