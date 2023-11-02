import { Component } from '@angular/core';
import {ProjectService} from "../../../api/project/project.service";
import {DataSharingService} from "../../../api/data-sharing.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {Project, ProjectRequest, ProjectResponse} from "../../../dto/project.dto.module";
import {TaskService} from "../../../api/task/task.service";
import {TaskRequest, TaskResponse, Tasks} from "../../../dto/task.dto.module";
import {User} from "../../../dto/user.dto.module";
import {UserService} from "../../../api/user/user.service";
import {DepartmentService} from "../../../api/department/department.service";
import {Department} from "../../../dto/department.dto.module";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent {
  constructor( private taskService:TaskService,
               private dataSharingService:DataSharingService,
               private toast:NgToastService,
               private router:Router,
               private userService:UserService,
               private projectService:ProjectService,
               private departmentService:DepartmentService,
  ) {}
  projects:Project[]|undefined=[]
  public departments: Department[]=[]
    public departmentSelectedId:number|undefined=undefined;
    public userSelectedId:number|undefined=undefined;
    public projectSelectedId:number|undefined=undefined;
  public selectedOption:string|undefined=undefined
public status=[
  {name:'Pending'},
  {name:'In progress'},
  {name:'Done'}
]
  formData:TaskRequest={
    status:undefined,
    title:'',
    description:'',
    user:undefined,
    dateFin:new Date,
    dateDebut:new Date,
    project:undefined,
    department: undefined,
  }
  users:User[]=[]
  response:TaskResponse={
    status:true,
    errors: [],
    message:''
  };

  submitForm() {
    console.log(this.formData)
    this.taskService.addtask("task",this.formData)
        .then(
            response=>{
              this.response=response.data
              if (this.response.status){
                this.toast.success({detail:"SUCCESS",summary:this.response.message,duration:2000});
                this.router.navigate(['/task'])
              }else {
                this.toast.error({detail:"ERROR",summary:this.response.message,duration:2000});
              }
            }
        )
        .catch(
            error=>{
              console.log(error)
            }
        )

  }

  ngOnInit(){
    const navigationPlace = 'task';
    this.dataSharingService.setVariable(navigationPlace);
    this.userService.usersByDepartment('user/department',this.departmentSelectedId)
        .then(
            response=>{
              this.users=response.data
            }
        )
        .catch(
            error=>{
              console.error(error)
            }
        )
    this.departmentService.getDepartments('department')
        .then(
            response=>{
              this.departments=response.data
            }
        )
        .catch(
            error=>{
              console.error(error)
            }
        )
    this.projectService.projects('project')
        .then(
            response=>{
              this.projects=response.data
            }
        )
        .catch(
            error=>{
              console.error(error)
            }
        )
  }

  filterByDepartment() {
    this.formData.department=this.departmentSelectedId
    this.userService.usersByDepartment('user/department',this.departmentSelectedId)
        .then(
            response=>{
              this.users=response.data
            }
        )
        .catch(
            error=>{
              console.error(error)
            }
        )
  }

    protected readonly console = console;
}
