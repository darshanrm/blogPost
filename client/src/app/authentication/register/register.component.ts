import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormValidationService } from '../../services/form-validation.service'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:any;


  constructor(
    private router: Router,
    private validate: FormValidationService,
    private auth: AuthService
    ) { }

  ngOnInit() {
   this.user = {
     name: '',
     email:'',
     password : '',
     password2: ''
   }
  }

 registerUser(){
  if(this.validate.validatePassword(this.user.password,this.user.password2)){
    this.auth.registerUser(this.user).subscribe(( data:any ) => {
      console.log(data);
      this.router.navigate(['/']);
    });
    
  }else{
    console.log("passwords must match");
  }   
 }

}
