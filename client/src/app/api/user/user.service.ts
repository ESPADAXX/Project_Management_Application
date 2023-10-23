import { Injectable } from '@angular/core';
import {ConfigService} from "../config.service";
import axios, {AxiosResponse} from "axios";
import {Login, Register, User} from "../../dto/user.dto.module";
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

  async getUserById(endpoint: String, id: Number): Promise<AxiosResponse<User>> {
    const url = `${this.configService.baseUrl}/${endpoint}/${id}`;
    return await axios.get(url);
  }

  login(endpoint: string, data: Login):Observable<any> {
    const url = `${this.configService.baseUrl}/${endpoint}`;
    return this.http.post(url, data);
  }
  register(endpoint: string, data: Register):Observable<any> {
    const url = `${this.configService.baseUrl}/${endpoint}`;
    return this.http.post(url, data);
  }

  async updateUser(endpoint: string, id: number, user: FormData
  ):Promise<AxiosResponse<User>>{
    const url = `${this.configService.baseUrl}/${endpoint}/${id}`


    return await axios.put(url,user)
  }
}
