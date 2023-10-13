import { Injectable } from '@angular/core';
import {ConfigService} from "../config.service";
import axios, {AxiosResponse} from "axios";
import {Login, Register} from "../../dto/dto.module";
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

  async get(endpoint: String, id: Number): Promise<AxiosResponse<Object>> {
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

  // Add other HTTP methods for user-related API calls
}
