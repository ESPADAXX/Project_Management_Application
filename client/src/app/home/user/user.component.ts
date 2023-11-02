import { Component } from '@angular/core';
import {TaskPage, TaskResponse} from "../../dto/task.dto.module";
import {Department} from "../../dto/department.dto.module";
import {TaskService} from "../../api/task/task.service";
import {DataSharingService} from "../../api/data-sharing.service";
import {NgToastService} from "ng-angular-popup";
import {DepartmentService} from "../../api/department/department.service";
import {UserPage, UserResponse} from "../../dto/user.dto.module";
import {UserService} from "../../api/user/user.service";
import {RoleService} from "../../api/role/role.service";
import {Role} from "../../dto/role.dto.module";

@Component({
  selector: 'app-user-list',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  public users: UserPage={
    content:[],
    pageable:{
      pageNumber:0,
      pageSize:10
    },
    totalPages:3
  };
  public department: Department[]=[];
  public roles: Role[]=[];
  public  departmentSelected: number|undefined = undefined
  public  roleSelected:number|undefined=undefined
  constructor(private userService:UserService,
              private dataSharingService: DataSharingService,
              private toast:NgToastService,
              private departmentService:DepartmentService,
              private roleService:RoleService
  ) {
  }

  response:UserResponse={
    status:true,
    errors: [],
    message:''
  };
  page:number=0
  size:number=10


  ngOnInit(){
    const variableToSend = 'user';
    this.dataSharingService.setVariable(variableToSend);
    this.userService.getUsers('user/page',this.page,this.size,this.departmentSelected?this.departmentSelected:undefined,this.roleSelected?this.roleSelected:undefined)
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
              this.department=response.data
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
  truncateDescription(description: string): string {
    if (description.length > 20) {
      return description.substring(0, 60) + '...';
    }
    return description;
  }

  deleteElement(id: number) {

    const confirmation=confirm('Are you sure want to delete project')
    if (confirmation){
      this.userService.delete('user',id)
          .then(response=>{
            this.response=response.data;
            if (this.response.status){
              this.toast.success({detail:"SUCCESS",summary:this.response.message,duration:2000});
            }else {
              this.toast.error({detail:"ERROR",summary:this.response.message,duration:2000});

            }
          })
    }

  }
  getPaginationRange(): number[] {
    const currentPage = this.users.pageable.pageNumber;
    const totalPages = this.users.totalPages;
    const range = 2; // Number of pages to show before and after the current page

    const start = Math.max(0, currentPage - range);
    const end = Math.min(totalPages - 1, currentPage + range);

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
  filter(){
    console.log(this.departmentSelected)
    this.userService.getUsers('user/page',0,this.size,this.departmentSelected?this.departmentSelected:undefined,this.roleSelected?this.roleSelected:undefined)
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

  loadPage(page: number) {
    if (page >= 0 && page < this.users.totalPages) {
      this.page = page;
      this.userService.getUsers('user/page', this.page, this.size, this.departmentSelected?this.departmentSelected:undefined,this.roleSelected?this.roleSelected:undefined)
          .then(response => {
            this.users = response.data;
          })
          .catch(error => {
            console.error(error);
          });
    }
  }
  formatDate(date: Date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // @ts-ignore
    return new Date(date).toLocaleDateString('en-US', options);
  }


}
