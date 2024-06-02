import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { environment } from '../environment/environment';
import { Post } from '../data/post';

@Injectable()
export class PostService {
  private postsUrl = `${environment.apiUrl}v1/posts`;
  constructor(private http: HttpClient) {}

  //Retrive all post (if there is a parameter, you can also search a post by title or content)
  getAll(search?: string): Observable<Post[]> {
    let params = new HttpParams();
    if (search) {
      params = params.set('search', search);
    }
    return this.http.get<Post[]>(this.postsUrl, { params }).pipe(
      map((posts) => posts.map((post) => this.transformPost(post))),
      catchError(this.handleError<Post[]>('getAll', []))
    );
  }

  //Retrieve all posts for a category(By categoriId)",
  getAllByCategoryId(categoryId: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${this.postsUrl}/by-category/${categoryId}`)
      .pipe(
        map((posts) => posts.map((post) => this.transformPost(post))),
        catchError(this.handleError<Post[]>('getAllByCategoryId', []))
      );
  }

  //Retrieve a post by id
  getById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.postsUrl}/${id}`).pipe(
      map((post) => this.transformPost(post)),
      catchError(this.handleError<Post>('getByCategoryId'))
    );
  }

  //Creat a new post
  //Creates a new post with the given title, content, and category ID provided in the request body. Returns the created post
  create(post: Post): Observable<Post> {
    return this.http
      .post<Post>(`${this.postsUrl}`, post)
      .pipe(catchError(this.handleError<Post>('create', post)));
  }

  //Update an existing post
  //Updates the title and content of an existing post identified by its ID. Returns the updated post
  update(id: string, post: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.postsUrl}/${id}`, post).pipe(
      map((post) => this.transformPost(post)),
      catchError(this.handleError<Post>('update', undefined))
    );
  }

  //Delete an existing post
  //Deletes the post identified by its ID. Returns a boolean indicating whether the deletion was successful
  deleteById(id: string): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.postsUrl}/${id}`)
      .pipe(catchError(this.handleError<boolean>('deleteById', false)));
  }

  //Retrieve all posts ordered by creation date
  //Returns all posts sorted by their creation dates in descending order
  orderedByCreatedDate(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.postsUrl}/sorted`).pipe(
      map((posts) => posts.map((post) => this.transformPost(post))),
      catchError(this.handleError<Post[]>('orderedByCreatedDate', undefined))
    );
  }

  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`, error);
      ///Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  //Change time format to make it more user friendly
  private transformPost(post: any): Post {
    return {
      ...post, //复制了 post 对象的所有属性到新的对象中
      createdDate: new Date(
        post.createdDate[0],
        post.createdDate[1] - 1,
        post.createdDate[2],
        post.createdDate[3],
        post.createdDate[4],
        post.createdDate[5],
        post.createdDate[6]
      ),
    };
  }
}
