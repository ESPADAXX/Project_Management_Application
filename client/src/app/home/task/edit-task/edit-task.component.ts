import { Component } from '@angular/core';
import {TaskService} from "../../../api/task/task.service";
import {DataSharingService} from "../../../api/data-sharing.service";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../api/user/user.service";
import {ProjectService} from "../../../api/project/project.service";
import {DepartmentService} from "../../../api/department/department.service";
import {Project} from "../../../dto/project.dto.module";
import {Department} from "../../../dto/department.dto.module";
import {TaskRequest, TaskResponse, Tasks} from "../../../dto/task.dto.module";
import {User} from "../../../dto/user.dto.module";


@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent {
  private id: number | undefined;
  constructor( private taskService:TaskService,
               private dataSharingService:DataSharingService,
               private toast:NgToastService,
               private router:Router,
               private userService:UserService,
               private projectService:ProjectService,
               private departmentService:DepartmentService,
               private route:ActivatedRoute
  ) {}
  projects:Project[]|undefined=[]
  public departments: Department[]=[]
  public departmentSelectedId:number|undefined=undefined;
  public userSelectedId:number|undefined=undefined;
  public projectSelectedId:number|undefined=undefined;
  public selectedOption:string|undefined=undefined

  public status=[
    {name:'Pending'},
    {name:'In Progress'},
    {name:'Done'}
  ]
  formData:TaskRequest={
    status:undefined,
    title:'',
    description:'',
    user:undefined,
    dateFin:new Date,
    dateDebut:new Date('2023-10-31'),
    project:undefined,
    department: undefined,
  }
  users:User[]=[]
  response:TaskResponse={
    status:true,
    errors: [],
    message:''
  };
  taskResponse:Tasks={
      id:0,
      status:'',
      title:'',
      description:'',
      dateFin:new Date,
      dateDebut:new Date,
      project:{
          id: 0,
          title: '',
          description: '',
          dateDebut: '',
          "dateFin": '',
          "client": {
              "id": 0,
              "name": ''
          },
          "price": 0
      },
      "department": {
          id: 0,
          name: ''
      },
      user:{
          "id": 0,
          "fullName": '',
          "pathPic": '',
          "email": '',
          "phone":'',
          "role": {
              "id": 0,
              "name": ''
          },
          department:{
              id:0,
              name:''
          }
      }
  };

  submitForm() {
    console.log(this.formData)
    this.taskService.editTask("task",this.taskResponse.id,this.formData)
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
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(<string>params.get('id'))
    })
    const navigationPlace = 'task';
    this.dataSharingService.setVariable(navigationPlace);
    if(this.id){
      this.taskService.getTaskById('task',this.id)
        .then(
          response=>{
            this.taskResponse=response.data
              this.formData.status=this.taskResponse.status
              this.formData.dateDebut=this.taskResponse.dateDebut
              this.formData.project=this.taskResponse.project.id
              this.formData.title=this.taskResponse.title
              this.formData.description=this.taskResponse.description
              this.formData.dateFin=this.taskResponse.dateFin
              this.formData.department=this.taskResponse.department.id
              this.formData.user=this.taskResponse.user.id
          }
        )
        .catch(error=>{
          console.error(error)
        }
        )
    }

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
    formatDate(date: Date) {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        // @ts-ignore
        return new Date(date).toLocaleDateString('en-US', options);
    }
}
