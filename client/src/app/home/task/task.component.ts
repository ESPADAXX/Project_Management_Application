import { Component } from '@angular/core';

import {DataSharingService} from "../../api/data-sharing.service";
import {NgToastService} from "ng-angular-popup";
import {TaskService} from "../../api/task/task.service";
import {TaskPage, TaskResponse} from "../../dto/task.dto.module";
import {DepartmentService} from "../../api/department/department.service";
import {Department} from "../../dto/department.dto.module";
import {ProjectService} from "../../api/project/project.service";


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  public tasks: TaskPage={
    content:[],
    pageable:{
      pageNumber:0,
      pageSize:10
    },
    totalPages:3
  };
  public department: Department[]=[];
  public  departmentSelected: number|undefined = undefined
  public  statusSelected:string|undefined=undefined
  constructor(private taskService:TaskService,
              private dataSharingService: DataSharingService,
              private toast:NgToastService,
              private departmentService:DepartmentService,
  ) {
  }

  response:TaskResponse={
    status:true,
    errors: [],
    message:''
  };
  page:number=0
  size:number=10


  ngOnInit(){
    const variableToSend = 'task';
    this.dataSharingService.setVariable(variableToSend);
    this.taskService.getPaginateTasks('task/page',this.page,this.size,this.departmentSelected?this.departmentSelected:undefined,this.statusSelected?this.statusSelected:undefined)
      .then(
        response=>{
          this.tasks=response.data
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
      this.taskService.deleteTask('project',id)
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
    const currentPage = this.tasks.pageable.pageNumber;
    const totalPages = this.tasks.totalPages;
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
      this.taskService.getPaginateTasks('task/page',0,this.size,this.departmentSelected?this.departmentSelected:undefined,this.statusSelected?this.statusSelected:undefined)
          .then(
              response=>{
                  this.tasks=response.data
              }
          )
          .catch(
              error=>{
                  console.error(error)
              }
          )
  }

  loadPage(page: number) {
    if (page >= 0 && page < this.tasks.totalPages) {
      this.page = page;
      this.taskService.getPaginateTasks('task/page', this.page, this.size, this.departmentSelected?this.departmentSelected:undefined,this.statusSelected?this.statusSelected:undefined)
          .then(response => {
          this.tasks = response.data;
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
