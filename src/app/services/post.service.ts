import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { POSTS, Post } from '../data/post';

@Injectable()
export class PostService {
  private postsUrl = '${environment.apiUrl}v1/posts';
  constructor(private http: HttpClient) {}

  //get all posts
  getPosts(): Observable<Post[]> {
    const posts = of(POSTS);
    return posts;
  }
}
