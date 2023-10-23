import { Injectable } from '@angular/core';
import {ConfigService} from "../config.service";
import axios, {AxiosResponse} from "axios";
import {Project, ProjectRequest, ProjectResponse} from "../../dto/project.dto.module";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private configService: ConfigService) { }
  async projectsNotExpired(endpoint:string):Promise<AxiosResponse<Project[]>>{
    return await axios.get(`${this.configService.baseUrl}/${endpoint}`)
  }
  async projects(endpoint:string):Promise<AxiosResponse<Project[]>>{
    return await axios.get(`${this.configService.baseUrl}/${endpoint}`)
  }
  async projectById(endpoint:string,id:number):Promise<AxiosResponse<Project>>{
    return await axios.get(`${this.configService.baseUrl}/${endpoint}/${id}`)
  }
  async project(endpoint:string,data:ProjectRequest):Promise<AxiosResponse<ProjectResponse>>{
    const headers = {
      'Content-Type': 'application/json',
      'Accept':'application/json'
    };
    return await axios.post(`${this.configService.baseUrl}/${endpoint}`,data,{headers})
  }
  async editProject(endpoint: string, id: number, data: Project):Promise<AxiosResponse<ProjectResponse>>{
    const headers = {
      'Content-Type': 'application/json',
      'Accept':'application/json'
    };
    return await axios.put(`${this.configService.baseUrl}/${endpoint}/${id}`,data,{headers})
  }

}
