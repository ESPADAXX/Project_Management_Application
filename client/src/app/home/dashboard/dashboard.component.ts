import { Component } from '@angular/core';
import {Color} from "../../dto/dto.module";
import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart
} from "ng-apexcharts"
import {TaskService} from "../../api/task/task.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  color=Color
  constructor(private taskService: TaskService) {
  }
  tasks:object={}
  ngOnInit() {
    this.taskService.get('task')
      .then(response => {
        console.log('Response:', response);
      })
      .catch(error => {
        console.error(error);
      });
  }
}
