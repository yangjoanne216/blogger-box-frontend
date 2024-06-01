import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Category } from '../data/category';

@Injectable()
export class CategoryService {
  private categoriesUrl = '${environment.apiUrl}v1/categories';

  constructor(private http: HttpClient) {}

  //Making HTTP GET Resquests: get all Categories
  getAll(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.categoriesUrl)
      .pipe(catchError(this.handleError<Category[]>('getAll')));
  }

  //Making HTTP GET Resquests: get categorie by id
  getById(id: string): Observable<Category> {
    return this.http
      .get<Category>(`${this.categoriesUrl}/${id}`)
      .pipe(catchError(this.handleError<Category>('getById')));
  }

  //Making HTTP POST Requests:
  create(category: Category): Observable<Category> {
    return this.http
      .post<Category>(this.categoriesUrl, category)
      .pipe(catchError(this.handleError<Category>('create', category)));
  }

  //Making HTTP PUT Requests:
  update(category: Category): Observable<Category> {
    return this.http
      .put<Category>(this.categoriesUrl, category)
      .pipe(catchError(this.handleError<Category>('put', category)));
  }

  //Making HTTP DELETE Requests
  delete(category: Category): Observable<boolean> {
    return this.http.delete<boolean>('${this.categoriesUrl}/${category.id}');
  }

  //Handling Errors
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error('${operation} failed ${eror.message}', error);
      //Let the app keep running by returning an empty result
      return of(result as T);
    };
  }
}
