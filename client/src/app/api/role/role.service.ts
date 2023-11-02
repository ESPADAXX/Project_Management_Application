import { Injectable } from '@angular/core';
import {ConfigService} from "../config.service";
import axios, {AxiosResponse} from "axios";
import {Role} from "../../dto/role.dto.module";


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private configService:ConfigService) { }
  async getRole(endPoint:String):Promise<AxiosResponse<Role[]>>{
    const url = `${this.configService.baseUrl}/${endPoint}`
    return await axios.get(url)
  }
  async getRoleByDepartmentId(endPoint:String,id:number|undefined):Promise<AxiosResponse<Role[]>>{
    const url = `${this.configService.baseUrl}/${endPoint}/${id}`
    return await axios.get(url)
  }
}
