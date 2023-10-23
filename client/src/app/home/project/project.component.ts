import { Component } from '@angular/core';
import {ProjectService} from "../../api/project/project.service";
import {Project} from "../../dto/project.dto.module";
import {DataSharingService} from "../../api/data-sharing.service";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  public projects: Project[]=[];
  constructor(private projectService:ProjectService , private dataSharingService: DataSharingService) {
  }
ngOnInit(){
  const variableToSend = 'project';
  this.dataSharingService.setVariable(variableToSend);
  this.projectService.projects('project')
    .then(
      response=>{
        this.projects=response.data
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
      return description.substring(0, 60) + '...';
    }
    return description;
  }
}
