import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../api/user/user.service";

import {DepartmentService} from "../../../api/department/department.service";
import {RoleService} from "../../../api/role/role.service";
import {Role} from "../../../dto/role.dto.module";
import {Department} from "../../../dto/department.dto.module";
import {User} from "../../../dto/user.dto.module";


@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  constructor(private route: ActivatedRoute,
              private userService :UserService,
              private departmentService:DepartmentService,
              private roleService:RoleService)
  {
  }
  public user: User ={
    id:0,
    fullName:'',
    pathPic:'',
    email:'',
    phone:'',
    role:{
      id:0,
      name:'Not selected yet'
    },
    department:{
      id:0,
      name:'not selected yet'
    }
  }
  public id:number=0
  public roles : Role[]=[]
  public departments: Department[]=[]
  public selectedRole: Role | null  = null;
  public selectedDepartment: Department | null =null ;
  public updatedFullname=''
  public updatedEmail=''
  public updatedPhone=''
  public updatedPicPath:File | null = null
  public updatedPwd=''
  public cnfPwd=''
ngOnInit():void{
  this.route.paramMap.subscribe(params => {
    this.id = parseInt(<string>params.get('id'))
    console.log(typeof(this.id));

  });
  this.userService.getUserById('user',this.id)
    .then(
      response=>
        this.user=response.data
    ).catch(error=>{
      console.error(error)}
  )
  this.departmentService.getDepartments('department')
    .then(
      response=>{
          this.departments=response.data
      }
    )
    .catch(error=>{
      console.log(error)
    })
this.roleService.getRole('role')
  .then(
    response=>
    {
      this.roles=response.data
    }
  ).catch(error=>{
  console.error(error)}
  )
}
// infosSubmit(){
//   const formData = new FormData();
//   formData.append('id', this.user.id.toString());
//   formData.append('fullName', this.updatedFullname ? this.updatedFullname : this.user.fullName);
//   formData.append('email', this.updatedEmail ? this.updatedEmail : this.user.email);
//   formData.append('phone', this.updatedPhone ? this.updatedPhone : this.user.phone);
//   formData.append('role', JSON.stringify(this.selectedRole?this.selectedRole:this.user.role));
//   formData.append('department', JSON.stringify(this.selectedDepartment?this.selectedDepartment:this.user.department));
//   formData.append('file', this.updatedPicPath as Blob);
//   this.userService.updateUser('user',this.id,formData)
//     .then(
//       response=>{
//         console.log(response)
//       }
//     )
//     .catch(error=>{
//       console.error(error)
//     })
//
//   }
//
//   updatedPic(event:any) {
//     this.updatedPicPath=event.target.files[0]
//   }
}
