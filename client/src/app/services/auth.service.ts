import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3002/signup', user, {headers: headers});
  }

  loginUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3002/login', user, {headers: headers});
  }

  storeUser(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logoutUser(){
    localStorage.clear();
  }

  getBlogs(){
    const token = localStorage.getItem('id_token');
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);
    return this.http.get('http://localhost:3002/post/getPost', { headers:headers });
  }

  getMyPosts(){
    const token = localStorage.getItem('id_token');
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);
    return this.http.get('http://localhost:3002/post/myPost', { headers:headers });
  }

  createPost(post){
    console.log(post);
    const token = localStorage.getItem('id_token');
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);
    return this.http.post('http://localhost:3002/post/createArticle',post, { headers:headers });
  }

  deleteBlog(postId){
    console.log(postId);
    let params = new HttpParams();
    params=params.set('comment_Id', postId);
    const token = localStorage.getItem('id_token');
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);
    return this.http.delete('http://localhost:3002/post/deletePost/'+postId, { headers:headers, params: params });
  }

  editBlog(editedBlog){
    console.log(editedBlog);
    const token = localStorage.getItem('id_token');
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    headers = headers.append('Authorization', token);
    return this.http.post('http://localhost:3002/post/editPost',editedBlog, { headers:headers });
  }
}
