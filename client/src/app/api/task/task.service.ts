import { Injectable } from '@angular/core';
import {ConfigService} from "../config.service";
import axios, {AxiosResponse} from "axios";
import {TaskPage, TaskRequest, TaskResponse, Tasks} from "../../dto/task.dto.module";
import {Department} from "../../dto/department.dto.module";


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private configService: ConfigService
              ) { }
  async getTasks(endPoint:string):Promise<AxiosResponse<any>>{
    const url:string=`${this.configService.baseUrl}/${endPoint}`;
    return await axios.get(url);
  }
  async addtask(endPoint:string,task:TaskRequest):Promise<AxiosResponse<TaskResponse>>{
    const url:string=`${this.configService.baseUrl}/${endPoint}`;
    return await axios.post(url,task);
  }
  async editTask(endPoint:string,id:number,task:TaskRequest):Promise<AxiosResponse<TaskResponse>>{
    const url:string=`${this.configService.baseUrl}/${endPoint}/${id}`;
    return await axios.put(url,task);
  }
  async taskByUser(endPoint: string, id: Number | undefined): Promise<AxiosResponse<any>> {
    const url: string = `${this.configService.baseUrl}/${endPoint}/user/${id}`;
    return await axios.get(url);
  }

async taskGroupedByDepartment(endPoint: string | undefined): Promise<AxiosResponse<any>> {
  const url: string = `${this.configService.baseUrl}/${endPoint}/department`;
return await axios.get(url);
}
async getTasksByProjectId(endPoint:string,id:number):Promise<AxiosResponse<Tasks[]>>{
    const url: string =`${this.configService.baseUrl}/${endPoint}/${id}`;
    return await axios.get(url);
}
async getTaskById(endPoint:string,id:number):Promise<AxiosResponse<Tasks>>{
  const url: string =`${this.configService.baseUrl}/${endPoint}/${id}`;
  return await axios.get(url);
}
  async deleteTask(endPoint:string,id:number):Promise<AxiosResponse<TaskResponse>>{
    const url: string =`${this.configService.baseUrl}/${endPoint}/${id}`;
    return await axios.delete(url);
  }
  async getPaginateTasks(endPoint: string, page: number, size: number, department: number | undefined, status: string | undefined):Promise<AxiosResponse<TaskPage>>{
    const params={
      page:page,
      size:size,
      department:department,
      status:status
    }
    const url:string=`${this.configService.baseUrl}/${endPoint}`;
    return await axios.get(url,{params});
  }
}
