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

  constructor(
    private authService: AuthService,
    private router: Router,
    private comm: CommonModule
  ) { }

  ngOnInit() {
    this.posts= '';
    this.authService.getBlogs().subscribe(( data:any ) => {
      if(data){
        this.posts = Object.entries(data).map(([type, value]) => ({type, value}));
        console.log(this.posts);
      }
    })
  }

}
