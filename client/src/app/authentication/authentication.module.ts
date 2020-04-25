import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path:'', 
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  }

];

@NgModule({
  declarations:[RegisterComponent, LoginComponent],
  imports: [RouterModule.forChild(routes),FormsModule, BrowserModule, HttpClientModule],
  exports: [RouterModule]
})
export class AuthenticationModule { }
