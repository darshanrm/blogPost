import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})


export class BlogComponent implements OnInit {

  posts: any;
  modal:any;
  likes:any;
  comments:any;
  user:any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private comm: CommonModule
  ) { }

  ngOnInit() {
    this.posts= '';
    this.showBlogs();
    this.getUser();
  }

  getUser(){
    this.user = this.authService.getUser();
  }

  showBlogs(){
      this.authService.getBlogs().subscribe(( data:any ) => {
      if(data){
        this.posts = Object.entries(data).map(([type, value]) => ({type, value}));
        console.log(this.posts);
      }
    });
  }
  showModal(blogId){
    console.log(blogId);
    for(var i=0;i<this.posts.length;i++){
      for(var j=0;j<this.posts[i].value.length;j++){
        if((this.posts[i].value[j]._id) == blogId){
          this.modal = this.posts[i].value[j];
        }
      }
    }
    this.showLikes(blogId);
    this.showComments(blogId);
  }

  showLikes(blogId){
    this.authService.getLikes(blogId).subscribe((data:any)=>{
      this.likes = data;
    });
  }

  likePost(postId){
    this.authService.likePost(postId).subscribe((data:any)=>{});
  }

  dislikePost(postId){
    this.authService.dislikePost(postId).subscribe((data:any)=>{});
  }

  postComment(postId){
    const text = (document.getElementById('comment') as HTMLInputElement).value;
    (document.getElementById('comment') as HTMLInputElement).value = '';
    const comment = {
      post : postId,
      comment: text
    }
    this.authService.postComment(comment).subscribe((data:any)=>{});
  }

  showComments(postId){
      this.authService.showComments(postId).subscribe((data:any)=>{
      this.comments = data;
      console.log(this.comments);
    });
  }

  deleteComment(commentId){
    this.authService.deleteComment(commentId).subscribe((data:any)=>{});
  }

}
