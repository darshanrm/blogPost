import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrls: ['./my-posts.component.css']
})
export class MyPostsComponent implements OnInit {
  posts:any;
  modal:any;
  newBlog:any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private comm: CommonModule
  ) { }

  ngOnInit() {
    this.showBlogs();
  }

  showBlogs(){
    this.authService.getMyPosts().subscribe((data:any) => {
      this.posts = data;
      this.posts = Object.entries(this.posts).map(([key, value]) => ({key, value}));
      console.log(this.posts);  
    });
  }

showModal(blogId){
  for(var i=0;i<this.posts.length;i++){
    if((this.posts[i].value._id) == blogId){
      this.modal = this.posts[i];
    }
  }
}

deleteBlog(blogId){
  console.log(blogId);
  this.authService.deleteBlog(blogId).subscribe((data:any)=>{
    console.log("post deleted");
    console.log(data);
    this.showBlogs();
  })
}


}
