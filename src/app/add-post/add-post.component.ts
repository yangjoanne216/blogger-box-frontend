import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../data/category';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.css',
})
export class AddPostComponent {
  postForm: FormGroup;
  categories: Category[] = [];

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private categoryService: CategoryService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      category: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      const postData = {
        title: this.postForm.value.title,
        content: this.postForm.value.content,
        category: this.postForm.value.category,
      };
      this.postService.create(postData).subscribe(
        () => {
          this.snackBar.open('Post created successfully!', 'Close', {
            duration: 3000,
          });
          this.router.navigate(['/']);
        },
        (error) => {
          this.snackBar.open('Failed to create post!', 'Close', {
            duration: 3000,
          });
          console.error('Error occurred while creating post:', error);
        }
      );
    }
  }
}
