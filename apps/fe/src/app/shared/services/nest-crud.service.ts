import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NestPaginationResponse } from '../models/pagination';
import { CreateQueryParams, RequestQueryBuilder } from '@nestjsx/crud-request';

@Injectable({
  providedIn: 'root'
})
export class NestCrudService<T extends {id: string|number}> {

  constructor(private http: HttpClient) {}

  apiUrl = environment.apiUrl;

  getList(directoryName: string): Observable<T[]> {
    return this.http.get<T[]>(`${this.apiUrl}/${directoryName}`);
  }

  /**
   * RequestQueryBuilder docs:
   * https://github.com/nestjsx/crud/wiki/Requests#frontend-usage
   */
  getEntities(
    entityName: string,
    queryParams: CreateQueryParams,
  ): Observable<NestPaginationResponse<T>> {
    const queryString = RequestQueryBuilder.create(queryParams).query();
    return this.http.get<NestPaginationResponse<T>>(`${this.apiUrl}/${entityName}?${queryString}`);
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
