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
  likes:any;
  comments:any;
  posts:any;
  modal:any;
  editImage:any;
  newImage:any;
  newBlog:any;
  constructor(
    private router: Router,
    private authService: AuthService,
    private comm: CommonModule
  ) { }

  ngOnInit() {
    this.newBlog={
      title:'',
      text:'',
      image:''
    }
    this.showBlogs();
  }

showBlogs(){
    this.authService.getMyPosts().subscribe((data:any) => {
      this.posts = data;
      this.posts = Object.entries(this.posts).map(([key, value]) => ({key, value}));
    });
    for(var i=0;i<this.posts.length;i++){
      this.showLikes(this.posts[i]._id);
      this.showComments(this.posts[i]._id);
    }
  }

showModal(blogId){
  for(var i=0;i<this.posts.length;i++){
    if((this.posts[i].value._id) == blogId){
      this.modal = this.posts[i];
    }
  }
}

showLikes(blogId){
  this.authService.getLikes(blogId).subscribe((data:any)=>{
    this.likes = data;
    console.log(this.likes);
  });
}


showComments(postId){
  this.authService.showComments(postId).subscribe((data:any)=>{
  this.comments = data;
});
}


deleteBlog(blogId){
  console.log(blogId);
    this.authService.deleteBlog(blogId).subscribe((data:any)=>{
    console.log("post deleted");
    console.log(data);
  })
}

editBlog(modal2){
  modal2.postId = modal2._id;
  modal2.image = this.editImage;
  this.authService.editBlog(modal2).subscribe((data:any)=>{});
}

selectImage(event){
  if(event.target.files.length > 0){
    const file = event.target.files[0];
    this.editImage = file;
  }
}


createImage(event){
  if(event.target.files.length > 0){
    const file = event.target.files[0];
    this.newImage = file;
  }
}

createPost(){
  this.newBlog.image = this.newImage;
  this.authService.createPost(this.newBlog).subscribe((data:any)=>{
    console.log(data);
  });
}

}
