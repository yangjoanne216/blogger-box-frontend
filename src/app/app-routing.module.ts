import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms'; // 导入 ReactiveFormsModule
import { NgModel } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-post', component: AddPostComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
