import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components
import {RegisterComponent} from "./Auth/register/register.component";
import {LoginComponent} from "./Auth/login/login.component";
import {authGuard} from "./auth.guard";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./home/dashboard/dashboard.component";
import {UserListComponent} from "./home/user-list/user-list.component";
import {TaskComponent} from "./home/task/task.component";
import {ProjectComponent} from "./home/project/project.component";


const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard', // Redirect to the 'dashboard' route
        pathMatch: 'full' // Match the full path
    },
  {path:'',component:HomeComponent ,canActivate:[authGuard],
  children:[
    {path:'dashboard', component: DashboardComponent,},
    {path:'project', component: ProjectComponent},
    {path:'task', component: TaskComponent},
    {path:'users', component: UserListComponent}
  ]},
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
