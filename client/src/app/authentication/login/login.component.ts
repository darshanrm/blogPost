import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormValidationService } from 'src/app/services/form-validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;

  constructor(
    private router: Router,
    private authService: AuthService,
    private validateService: FormValidationService
  ) { }

  ngOnInit() {
  }

  signin(){
    const user = {
      email: this.email,
      password: this.password
    }
    if(this.validateService.validateRegister(user)){
      this.authService.loginUser(user).subscribe(( data:any ) => {
        if(data.success){
          console.log(data);
          this.authService.storeUser(data.token, data.user);
          this.router.navigate(['blog']);
        }
      }); 
    }else{
      console.log("user not found");
    }

  }

}
