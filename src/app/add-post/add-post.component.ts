import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../services/post.service';
import { CategoryService } from '../services/category.service';
import { Category } from '../data/category';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
    private router: Router
  ) {
    this.postForm = this.fb.group({
      title: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(150),
          ],
          updateOn: 'blur',
        },
      ],
      content: [
        '',
        {
          validators: [Validators.required, Validators.maxLength(2500)],
          updateOn: 'blur',
        },
      ],
      categoryName: [
        null,
        {
          validators: [Validators.required],
          updateOn: 'blur',
        },
      ],
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe((categories) => {
      this.categories = categories;
    });
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please review your post',
      });
      return;
    }

    const postData = {
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      categoryName: this.postForm.value.categoryName,
    };
    if (this.postForm.valid) {
      this.postService.create(postData).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Post Submitted Successfully',
            showConfirmButton: false,
            timer: 1500,
          });
          this.router.navigate(['/']);
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Failed to create post!',
            text: 'An error occurred while creating the post. Please try again.',
            showConfirmButton: true,
          });
          console.error('Error occurred while creating post:', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please review your post',
        showConfirmButton: true,
      });
    }
  }

  get title() {
    return this.postForm.get('title');
  }

  get content() {
    return this.postForm.get('content');
  }

  get category() {
    return this.postForm.get('category');
  }
}
