import { Injectable } from '@angular/core';
import {ConfigService} from "../config.service";
import axios, {AxiosResponse} from "axios";
import {Tasks} from "../../dto/task.dto.module";


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
}
