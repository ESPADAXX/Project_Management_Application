import { Injectable } from '@angular/core';
import {ConfigService} from "../config.service";
import {HttpClient} from "@angular/common/http";
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {Observable} from "rxjs";
import axios, {AxiosResponse} from "axios";
import {List} from "postcss/lib/list";
import {list} from "postcss";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private configService: ConfigService,
              private http: HttpClient) { }
  async get(endPoint: string): Promise<AxiosResponse<any>> {
    const url: string = `${this.configService.baseUrl}/${endPoint}`;
    return await axios.get(url);
  }}
