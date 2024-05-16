import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostListComponent } from './post-list/post-list.component';
import { NgModel } from '@angular/forms';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar.component';

const routes: Routes = [
  {path:'',component:PostListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

