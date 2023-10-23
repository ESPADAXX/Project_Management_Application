import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import your components
import {RegisterComponent} from "./Auth/register/register.component";
import {LoginComponent} from "./Auth/login/login.component";
import {authGuard} from "./auth.guard";
import {HomeComponent} from "./home/home.component";
import {DashboardComponent} from "./home/dashboard/dashboard.component";
import {UserComponent} from "./home/user/user.component";
import {TaskComponent} from "./home/task/task.component";
import {ProjectComponent} from "./home/project/project.component";
import {UserDetailsComponent} from "./home/user/user-details/user-details.component";
import {ProjectDetailsComponent} from "./home/project/project-details/project-details.component";
import {AddProjectComponent} from "./home/project/add-project/add-project.component";
import {EditProjectComponent} from "./home/project/edit-project/edit-project.component";


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
      {path:'project/:id', component: ProjectDetailsComponent},
      {path:'new-project', component: AddProjectComponent},
      {path:'edit-project/:id', component: EditProjectComponent},
      {path:'task', component: TaskComponent},
      {path:'users', component: UserComponent},
      {path:'user/:id', component: UserDetailsComponent}
  ]},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
