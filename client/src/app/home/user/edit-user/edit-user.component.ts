import { Component } from '@angular/core';
import {TaskService} from "../../../api/task/task.service";
import {DataSharingService} from "../../../api/data-sharing.service";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../api/user/user.service";
import {ProjectService} from "../../../api/project/project.service";
import {DepartmentService} from "../../../api/department/department.service";
import {Department} from "../../../dto/department.dto.module";
import {User, UserRequest, UserResponse} from "../../../dto/user.dto.module";
import {RoleService} from "../../../api/role/role.service";
import {Role} from "../../../dto/role.dto.module";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  private id: number | undefined;
  public photoUrl: string | undefined;
  constructor( private taskService:TaskService,
               private dataSharingService:DataSharingService,
               private toast:NgToastService,
               private router:Router,
               private userService:UserService,
               private departmentService:DepartmentService,
               private roleService:RoleService,
               private route:ActivatedRoute
  ) {}
  public departments: Department[]=[]
  public roles: Role[]=[]
  public departmentSelectedId:number|undefined=undefined;
  public roleSelectedId:number|undefined=undefined;

  public status=[
    {name:'Pending'},
    {name:'In Progress'},
    {name:'Done'}
  ]
  public userConnected:any
  formData:UserRequest={
    fullName:'',
    email:'',
    phone:'',
    role:0,
    department: 0,
  }
  users:User[]=[]
  response:UserResponse={
    status:true,
    errors: [],
    message:''
  };
  userResponse: User={
      id: 0,
      fullName: '',
      pathPic: '',
      email: '',
      phone:'',
      role: {
        id: 0,
        name: ''
      },
      department:{
        id:0,
        name:''
      }
    }


  submitForm() {
    console.log(this.formData)
    this.userService.updateUser("user",this.userResponse.id,this.formData)
        .then(
            response=>{
              this.response=response.data
              if (this.response.status){
                this.toast.success({detail:"SUCCESS",summary:this.response.message,duration:2000});
                this.router.navigate(['/user'])
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
    this.userConnected = JSON.parse(<string>sessionStorage.getItem('user'))
    const navigationPlace = 'user';
    this.dataSharingService.setVariable(navigationPlace);
    if(this.id){
      this.userService.getUserById('user',this.id)
          .then(

              response=>{
                this.userResponse=response.data
                this.formData.fullName=this.userResponse.fullName
                this.formData.phone=this.userResponse.phone
                this.formData.email=this.userResponse.email
                this.formData.department=this.userResponse.department?.id
                this.formData.role=this.userResponse.role?.id
                console.log(this.userConnected.id)
                console.log(this.userResponse.id)
                this.onGetPhoto(this.id);

              }
          )
          .catch(error=>{
                console.error(error)
              }
          )
    }


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
    this.roleService.getRole('role')
        .then(
            response=>{
              this.roles=response.data
            }
        )
        .catch(
            error=>{
              console.error(error)
            }
        )
  }

  filterByDepartment() {

      this.roleService.getRoleByDepartmentId('role/department',this.departmentSelectedId)
        .then(
          response=>{
            this.roles=response.data
          }
        )
        .catch(
          error=>{
            console.error(error)
          }
        )

  }
  onGetPhoto(id: number | undefined) {
    if (id){
      this.userService.getUserPhoto('user/image', id)
        .then((response) => {
          if (response.status === 200) {
            console.log(response)
            const blob = new Blob([response.data], { type: 'image/jpeg' });
            this.photoUrl = URL.createObjectURL(blob);
          } else {
            console.error('Failed to retrieve the photo.');
          }
        })
        .catch((error) => {
          console.error('An error occurred while fetching the photo:', error);
        });
    }
  }
}
