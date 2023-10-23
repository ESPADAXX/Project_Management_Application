import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {

  private variableEmitter = new BehaviorSubject<string>('Dashboard'); // Initial value can be empty

  setVariable(variable: string) {
    this.variableEmitter.next(variable);
  }

  getVariable() {
    return this.variableEmitter.asObservable();
  }
}
