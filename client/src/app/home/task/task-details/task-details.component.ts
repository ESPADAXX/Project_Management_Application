import { Component } from '@angular/core';
import {TaskService} from "../../../api/task/task.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataSharingService} from "../../../api/data-sharing.service";
import {Tasks} from "../../../dto/task.dto.module";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
  constructor(private taskService:TaskService,
              private dataSharingService:DataSharingService,
              private route:ActivatedRoute) {
  }
  private id:number|undefined

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
  ngOnInit(){

    const navigationPlace = 'project';
    this.dataSharingService.setVariable(navigationPlace);
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(<string>params.get('id'))
    });
    if (this.id){

    this.taskService.getTaskById('task',this.id)
        .then(
            response=>{
              this.taskResponse=response.data
            }
        )
        .catch(
            error=>{
              console.error(error)
            }
        )
    }
  }
  formatDate(date: Date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  // @ts-ignore
  return new Date(date).toLocaleDateString('en-US', options);
  }
}
