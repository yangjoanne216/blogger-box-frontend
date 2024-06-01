import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from '../data/category';

@Injectable()
export class CategoryService {
  private categoriesUrl = '${environment.apiUrl}v1/categories';

  constructor(private http: HttpClient) {}

  //Making HTTP GET Resquests: get all Categories

  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl);
  }

  //Making HTTP POST Requests:
  /*create(category:CategoryCreateInput):Observable<Category>{
    return this.http.post<Category>(this.categoriesUrl,category);
  }*/

  //Making HTTP PUT Requests:
  update(category: Category): Observable<Category> {
    return this.http.put<Category>(this.categoriesUrl, category);
  }

  //Making HTTP DELETE Requests
  delete(category: Category): Observable<boolean> {
    return this.http.delete<boolean>('$(this.categoriesUrl)/${category.id}');
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
