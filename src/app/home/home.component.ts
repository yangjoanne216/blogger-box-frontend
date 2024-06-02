import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../data/post';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.getAll();
  }

  getAll(): void {
    this.postService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }
}
