import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectService} from "../../../api/project/project.service";
import {Project} from "../../../dto/project.dto.module";
import {Tasks} from "../../../dto/task.dto.module";
import {TaskService} from "../../../api/task/task.service";
import {DataSharingService} from "../../../api/data-sharing.service";

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent {
    private id: number=0;
    public project: Project={
      id:0,
        title:'',
        description:'',
        dateFin:new Date(),
        dateDebut:new Date(),
        price:0,
        client:''
    };
    public tasks:Tasks[]=[]
constructor(private route: ActivatedRoute,private projectService:ProjectService ,private taskService:TaskService, private dataSharingService: DataSharingService) {
}
ngOnInit(){
  const navigationPlace = 'project';
  this.dataSharingService.setVariable(navigationPlace);
    this.route.paramMap.subscribe(params => {
        this.id = parseInt(<string>params.get('id'))
    });
    this.projectService.projectById('project',this.id)
        .then(
          response=>{
            this.project=response.data
          }
        )
        .catch(
          error=>{
            console.error(error)
          }
        )
  this.taskService.getTasksByProjectId('task/project',this.id)
    .then(
      response=>{
        this.tasks=response.data
        console.log(response.data)
      }
    )
    .catch(
      error=>{
        console.error(error)
      }
    )
}
  truncateDescription(description: string): string {
    if (description.length > 20) {
      return description.substring(0, 30) + '...';
    }
    return description;
  }
  protected readonly formatDate = formatDate;
}
function formatDate(date: Date) {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  // @ts-ignore
  return new Date(date).toLocaleDateString('en-US', options);
}

