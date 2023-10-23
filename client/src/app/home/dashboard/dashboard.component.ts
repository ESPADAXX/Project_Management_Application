import {Component , ViewChild } from '@angular/core';
import { User} from "../../dto/user.dto.module";
import { formatDistanceToNow, parseISO ,format} from 'date-fns';
import {
    ApexNonAxisChartSeries,
    ApexPlotOptions,
    ApexChart,
    ApexLegend,
    ApexResponsive,
    ChartComponent
} from "ng-apexcharts";
import {MatSort} from '@angular/material/sort';
import {TaskService} from "../../api/task/task.service";
import {ProjectService} from "../../api/project/project.service";
import {Projects} from "@angular/cli/lib/config/workspace-schema";
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';


import {
  ApexAxisChartSeries,
  ApexDataLabels,
  ApexYAxis,
  ApexStroke,
  ApexXAxis,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

import {Tasks, TasksColors} from "../../dto/task.dto.module";
import {DataSharingService} from "../../api/data-sharing.service";

export type ChartOptions2 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};
export type ChartOptions = {
    series?: ApexNonAxisChartSeries|undefined;
    chart?: ApexChart;
    labels?: string[];
    colors?: string[];
    legend?: ApexLegend;
    plotOptions: ApexPlotOptions;
    responsive: ApexResponsive | ApexResponsive[] | any;
};


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {

  @ViewChild(MatSort) sort: MatSort | undefined;

  @ViewChild("chart") chart: ChartComponent | undefined;

  public chartOptions!: Partial<ChartOptions>;
  public chartOptions2!: Partial<ChartOptions2>;

  public totalTasks: number | undefined;

  public tasksWithColors: TasksColors[] | undefined;
  public projects: Projects[] | undefined;
  public projectCount: number | undefined;
  public tasksByDep: any;
  public percentages: Record<string, number> = {};
  public departmentNames: string[] | undefined;
  public departmentPercentages: number[] | undefined;

  constructor(private taskService: TaskService, private projectService: ProjectService , private dataSharingService: DataSharingService) {
    this.chartOptions2 = {
      series: [
        {
          name: "Net Profit",
          data: [44, 55, 57, 56, 61, 58, 63]
        },
        {
          name: "Revenue",
          data: [76, 85, 101, 98, 87, 105, 91]
        },
        {
          name: "Free Cash Flow",
          data: [35, 41, 36, 26, 45, 48, 52]
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"]
      },
      xaxis: {
        categories: [
          "Mon",
          "Tue",
          "Wen",
          "Thu",
          "Fri",
          "Sat",
          "San",
        ]
      },
      yaxis: {
        title: {
          text: "$ (thousands)"
        }
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " Tasks";
          }
        }
      }
    };
  }


  tasksByUser: Tasks[] | undefined
  taskStatus: String[] | undefined
  public tasks: any;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
    eventClick: handleEventClick.bind(this),
  };

  ngOnInit() {
    const variableToSend = 'dashboard';
    this.dataSharingService.setVariable(variableToSend);
    const userString: string | null = sessionStorage.getItem('user');


    if (userString) {
      const user: User = JSON.parse(userString);
      const userId: number = parseInt(String(user.id));

      this.taskService.taskByUser('task', userId)
        .then(response => {
          this.tasksByUser = response.data;
          this.buildEvents()
          this.taskStatus = this.tasksByUser?.map(taskByUser => taskByUser.status);
          if (this.tasksByUser != undefined) {
            this.totalTasks = this.tasksByUser?.length
            // @ts-ignore
            this.tasksWithColors = this.tasksByUser.map((task: TasksColors) => {
              const timeDifference = getTimeDifference(new Date(task.dateFin));
              return {
                status: task.status,
                title: task.title,
                description: task.description,
                date: task.dateFin,
                color: getColorBasedOnDate(task.dateFin),
                time: timeDifference,
                icon: getIconBasedOnDate(task.dateFin)
              };
            });
          } else {
            null
          }


        })
        .catch(error => {
          console.error(error);
        });
      this.projectService.projectsNotExpired('project/notExpired')
        .then(
          response => {
            this.projects = response.data
            this.projectCount = this.projects?.length
          }
        )
        .catch(error => {
          console.error(error)
        })

      this.taskService.taskGroupedByDepartment('task')
        .then(response => {
          this.tasksByDep = response.data;

          // Calculate percentages
          const doneTasksByDepartment: Record<string, number> = {};
          this.tasksByDep.forEach((task: { departmentName: any; taskStatus: string; }) => {
            const departmentName = task.departmentName;

            if (task.taskStatus === 'Done') {
              doneTasksByDepartment[departmentName] = (doneTasksByDepartment[departmentName] || 0) + 1;
            }
          });

          Object.keys(doneTasksByDepartment).forEach(departmentName => {
            const totalTasks = this.tasksByDep.filter((task: {
              departmentName: string;
            }) => task.departmentName === departmentName).length;
            const doneTasks = doneTasksByDepartment[departmentName];

            this.percentages[departmentName] = Math.round((doneTasks / totalTasks) * 100);
          });

          this.departmentNames = Object.keys(this.percentages);
          this.departmentPercentages = Object.values(this.percentages);
          if (this.departmentNames.length > 0 && this.departmentPercentages.length > 0) {
            this.chartOptions = {
              series: this.departmentPercentages,
              chart: {
                height: 300,
                type: "radialBar"
              },
              plotOptions: {
                radialBar: {
                  offsetY: -30,
                  offsetX: 100,
                  startAngle: 0,
                  endAngle: 220,
                  hollow: {
                    margin: 60,
                    size: "30%",
                    background: "transparent",
                    image: undefined
                  },
                  dataLabels: {
                    name: {
                      show: false
                    },
                    value: {
                      show: false
                    }
                  }
                }
              },
              colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
              labels: this.departmentNames,
              legend: {
                show: true,
                floating: true,
                fontSize: "12px",
                position: "left",
                offsetX: -30,
                offsetY: 150,
                width: 500,
                labels: {
                  useSeriesColors: true
                },
                formatter: function (seriesName, opts) {
                  return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + " %";
                },
                itemMargin: {
                  horizontal: 3
                }
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    legend: {
                      show: false
                    }
                  }
                }
              ]
            };
          }
          // You can use 'percentages' as needed in your component
        })
        .catch(error => {
          console.error(error);
        });
      this.taskService.getTasks('task')
        .then(
          response => {
            this.tasks = response.data.slice(0, 4)
          }
        )
        .catch(
          error => {
            console.error(error)
          }
        )
    }
  }

  buildEvents() {

    this.calendarOptions.events = this.tasksByUser?.map((task: { title: any; description:any;dateDebut: any; dateFin: any }) => ({
      title: task.title,
      description:task.description,
      start: format(parseISO(task.dateDebut), 'yyyy-MM-dd'),
      end: format(parseISO(task.dateFin), 'yyyy-MM-dd'),
      color:getRandomColor()
    }));

  }
}
function handleEventClick(clickedEvent: any) {
  // Extract the details of the clicked task from the event object
  const taskDetails = {
    title: clickedEvent.event.title,
    description:clickedEvent.event.extendedProps.description,
    start: clickedEvent.event.start,
    end: clickedEvent.event.end,
    // Add more properties as needed
  };
console.log(taskDetails)
  // You can now display or do something with the task details (e.g., show a modal, open a details view, etc.)
  window.alert('Clicked Task Details: '+ taskDetails.title+ "\n Description of task:"+taskDetails.description);
}
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
function getIconBasedOnDate(taskDate: Date) {
  const currentDate = new Date();
  const taskDateObj = new Date(taskDate);

  if (taskDateObj < currentDate) {
    return 'assets/img/danger.png';
  } else if (taskDateObj.toDateString() === currentDate.toDateString()) {
    return 'assets/img/warning.png';
  } else {
    return 'assets/img/safe.png';
  }
}
function getColorBasedOnDate(taskDate: Date): string {
  const currentDate = new Date();
  const taskDateObj = new Date(taskDate);

  if (taskDateObj < currentDate) {
    return '#D11F00';
  } else if (taskDateObj.toDateString() === currentDate.toDateString()) {
    return '#FCC419';
  } else {
    return '#00B72A';
  }
}
function getTimeDifference(taskDate: Date): string {
    const currentDate = new Date();
    const dateFin = parseISO(taskDate.toISOString());

    if (dateFin > currentDate) {
        // Calculate remaining time
        return `${formatDistanceToNow(dateFin)} remaining`;
    } else {
        // Calculate time passed
        return `${formatDistanceToNow(dateFin)} passed`;
    }
}

