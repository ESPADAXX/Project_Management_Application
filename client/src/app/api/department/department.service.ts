import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from "axios";

import {ConfigService} from "../config.service";
import {Department} from "../../dto/department.dto.module";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor( private  configService:ConfigService) { }
  async getDepartments(endPoint:string):Promise<AxiosResponse<Department[]>>{
    const url=`${this.configService.baseUrl}/${endPoint}`;
     return await axios.get(url);
  }
  async departmentById(endPoint:string,id:number):Promise<AxiosResponse<Department>>{
    const url=`${this.configService.baseUrl}/${endPoint}/${id}`;
    return await axios.get(url);
  }
}
