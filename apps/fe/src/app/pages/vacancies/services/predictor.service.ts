import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PredictorService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getTitles(query: string): Observable<string[]> {

    const params = new HttpParams().set('key', query);

    return this.http.get<string[]>(`${this.apiUrl}/vacancy-predictor/vacancies-titles`, {params});
  }
}
