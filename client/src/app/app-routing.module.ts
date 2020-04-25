import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModule } from './authentication/authentication.module';
import { BlogModule } from './blog/blog.module';

const routes: Routes = [
    {
        path:'',
        redirectTo:'user',
        pathMatch:'full'
    },
    {
        path:'user',
        loadChildren:'./authentication/authentication.module#AuthenticationModule'
    },
    {
        path:'blog',
        loadChildren:'./blog/blog.module#BlogModule'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AuthenticationModule, BlogModule],
  exports: [RouterModule]
})
export class Router { }
