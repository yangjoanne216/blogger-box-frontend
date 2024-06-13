import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Category, CategoryCreateInput } from '../data/category';
import { environment } from '../environment/environment';
@Injectable()
export class CategoryService {
  private categoriesUrl = `${environment.apiUrl}v1/categories`;

  constructor(private http: HttpClient) {}

  getAll(name?: string): Observable<Category[]> {
    let params = new HttpParams();
    if (name) {
      params = params.set('name', name);
    }
    return this.http
      .get<Category[]>(this.categoriesUrl, { params })
      .pipe(catchError(this.handleError<Category[]>('getAll', [])));
  }

  getById(id: string): Observable<Category> {
    return this.http
      .get<Category>(`${this.categoriesUrl}/${id}`)
      .pipe(catchError(this.handleError<Category>('getById')));
  }

  create(categoryCreateInput: CategoryCreateInput): Observable<Category> {
    return this.http
      .post<Category>(this.categoriesUrl, { categoryCreateInput })
      .pipe(catchError(this.handleError<Category>('create')));
  }

  update(id: string, name: string): Observable<Category> {
    return this.http
      .put<Category>(`${this.categoriesUrl}/${id}`, { name })
      .pipe(catchError(this.handleError<Category>('update')));
  }

  deleteById(id: string): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.categoriesUrl}/${id}`)
      .pipe(catchError(this.handleError<boolean>('deleteById', false)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);
      return of(result as T);
    };
  }
}
