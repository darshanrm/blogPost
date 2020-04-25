import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './blog/blog.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { MyPostsComponent } from './my-posts/my-posts.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


const routes: Routes = [
  {
    path:'',
    component: BlogComponent
  },
  {
    path: 'myPosts',
    component: MyPostsComponent
  }
];

@NgModule({
  declarations:[BlogComponent, FloatingButtonComponent, TopBarComponent, MyPostsComponent],
  imports: [RouterModule.forChild(routes), CommonModule, FormsModule, HttpClientModule],
  exports: [RouterModule]
})
export class BlogModule { }
