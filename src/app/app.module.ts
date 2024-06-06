import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/post.service';
import { CategoryService } from './services/category.service';
import { PostListComponent } from './post-list/post-list.component';
import { CommonModule } from '@angular/common';
import { PostListItemComponent } from './post-list-item/post-list-item.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { ReactiveFormsModule } from '@angular/forms'; // 导入 ReactiveFormsModule
import { MatSnackBarModule } from '@angular/material/snack-bar'; //Show failure and success messages
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //animation
@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PostListComponent,
    PostListItemComponent,
    HomeComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
  ],
  providers: [PostService, CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
