import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { PostService } from './services/post.service';
import { PostListComponent } from './post-list/post-list.component';
import { CommonModule } from '@angular/common';
import { PostListItemComponent } from './post-list-item/post-list-item.component';

@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    PostListComponent,
    PostListItemComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, CommonModule],
  providers: [PostService],
  bootstrap: [AppComponent],
})
export class AppModule {}
