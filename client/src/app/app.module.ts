import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ProjectComponent } from './home/project/project.component';
import { TaskComponent } from './home/task/task.component';
import { UserComponent } from './home/user/user.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserDetailsComponent } from './home/user/user-details/user-details.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ProjectDetailsComponent } from './home/project/project-details/project-details.component';
import { AddProjectComponent } from './home/project/add-project/add-project.component';
import { EditProjectComponent } from './home/project/edit-project/edit-project.component';
import { NgxAwesomePopupModule } from '@costlydeveloper/ngx-awesome-popup';
import { ConfirmBoxConfigModule } from '@costlydeveloper/ngx-awesome-popup';
import {NgToastModule} from "ng-angular-popup";
import { AddTaskComponent } from './home/task/add-task/add-task.component';
import { EditTaskComponent } from './home/task/edit-task/edit-task.component';
import { TaskDetailsComponent } from './home/task/task-details/task-details.component';
import { EditUserComponent } from './home/user/edit-user/edit-user.component';
import { ProfileComponent } from './home/user/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    ProjectComponent,
    TaskComponent,
    UserComponent,
    RegisterComponent,
    LoginComponent,
    UserDetailsComponent,
    ProjectDetailsComponent,
    AddProjectComponent,
    EditProjectComponent,
    AddTaskComponent,
    EditTaskComponent,
    TaskDetailsComponent,
    EditUserComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    NgToastModule,
    NgxAwesomePopupModule.forRoot(),
    ConfirmBoxConfigModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
