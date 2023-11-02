import { Injectable } from '@angular/core';
import {ConfigService} from "../config.service";
import axios, {AxiosResponse} from "axios";
import {
  Login,
  PasswordResponse,
  PhotoResponse,
  Register,
  User,
  UserPage,
  UserRequest,
  UserResponse
} from "../../dto/user.dto.module";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {List} from "postcss/lib/list";



@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private configService: ConfigService,
    private http: HttpClient
  ) {}
  async getUsers(endPoint: string, page: number, size: number, department: number | undefined, role: number | undefined): Promise<AxiosResponse<UserPage>> {
    const params={
      page:page,
      size:size,
      department:department,
      role:role,
    }
    const url = `${this.configService.baseUrl}/${endPoint}`;
    return await axios.get(url,{params});
  }
  async usersByDepartment(endpoint: string,id:number|undefined):Promise<AxiosResponse<User[]>>{
    const url = `${this.configService.baseUrl}/${endpoint}`
    const params={
      id:id
    }
    return await axios.get(url,{params})
  }
  async getUserById(endpoint: String, id: Number): Promise<AxiosResponse<User>> {
    const url = `${this.configService.baseUrl}/${endpoint}/${id}`;
    return await axios.get(url);
  }
  async delete(endpoint: String, id: Number): Promise<AxiosResponse<UserResponse>> {
    const url = `${this.configService.baseUrl}/${endpoint}/${id}`;
    return await axios.delete(url);
  }

  login(endpoint: string, data: Login):Observable<any> {
    const url = `${this.configService.baseUrl}/${endpoint}`;
    return this.http.post(url, data);
  }
  register(endpoint: string, data: Register):Observable<any> {
    const url = `${this.configService.baseUrl}/${endpoint}`;
    return this.http.post(url, data);
  }

  async updateUser(endpoint: string, id: number, user: UserRequest
  ):Promise<AxiosResponse<UserResponse>>{
    const url = `${this.configService.baseUrl}/${endpoint}/${id}`


    return await axios.put(url,user)
  }
  async changePassword(endpoint: String,id:number,oldPasswrod:string|undefined,newPassword:string|undefined,confirmPassword:string|undefined): Promise<AxiosResponse<PasswordResponse>> {
    const url = `${this.configService.baseUrl}/${endpoint}`;
    const formData={
      id:id,
      oldPassword:oldPasswrod,
      newPassword:newPassword,
      confirmPassword:confirmPassword
    }
    return await axios.post(url,formData);
  }
  async changePhoto(endPoint:string,id:number,photo:File): Promise<AxiosResponse<PhotoResponse>>{
    const url = `${this.configService.baseUrl}/${endPoint}/${id}`
    const formData=new FormData()
    formData.append('photo',photo)

    return await axios.post(url,formData)
  }

  getUserPhoto(endPoint: string, userId: number) {
    return axios.get(`${this.configService.baseUrl}/${endPoint}/${userId}`, { responseType: 'arraybuffer' });
  }
}
