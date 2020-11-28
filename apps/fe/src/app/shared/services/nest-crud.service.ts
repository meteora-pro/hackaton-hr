import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NestPaginationResponse } from '../models/pagination';

@Injectable({
  providedIn: 'root'
})
export class NestCrudService<T extends {id: string|number}> {

  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  getList(directoryName: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${directoryName}`);
  }

  getEntities(
    entityName: string,
    offset: number,
    limit: number
  ): Observable<NestPaginationResponse<T>> {
    let params = new HttpParams();
    if (offset) {
      params = params.append('offset', `${offset}`);
    }
    if (limit) {
      params = params.append('limit', `${limit}`);
    }
    return this.http.get<NestPaginationResponse<T>>(`${this.apiUrl}/${entityName}`, {
      params
    });
  }

  updateItem(directoryName: string, item: T): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${directoryName}/${item.id}`, {
      ...item
    });
  }

  addItem(directoryName: string, item: T): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${directoryName}`, {
      ...item
    });
  }
}
