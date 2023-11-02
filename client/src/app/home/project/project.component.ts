import { Component } from '@angular/core';
import {ProjectService} from "../../api/project/project.service";
import {Project, ProjectResponse} from "../../dto/project.dto.module";
import {DataSharingService} from "../../api/data-sharing.service";
import {
  ConfirmBoxInitializer,
  DialogLayoutDisplay,
  DisappearanceAnimation,
  AppearanceAnimation
} from '@costlydeveloper/ngx-awesome-popup';
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent {
  public projects: Project[]=[];
  constructor(private projectService:ProjectService,
              private dataSharingService: DataSharingService,
              private toast:NgToastService,
  ) {
  }

  response:ProjectResponse={
    status:true,
    errors: [],
    message:''
  };
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

  deleteElement(id: number) {
    // const newConfirmBox = new ConfirmBoxInitializer();
    //
    // newConfirmBox.setTitle('Delete Project');
    // newConfirmBox.setMessage('Are you sure you want to delete the project ?');
    //
    // newConfirmBox.setConfig({
    //   layoutType: DialogLayoutDisplay.DANGER,
    //   animationIn: AppearanceAnimation.BOUNCE_IN,
    //   animationOut: DisappearanceAnimation.BOUNCE_OUT,
    //   buttonPosition: 'right',
    // });
    //
    // newConfirmBox.setButtonLabels('Yes', 'No');
    //
    // newConfirmBox.openConfirmBox$().subscribe(resp => {
    //   if(resp.clickedButtonID){
    //     console.log('Button clicked: ', resp.clickedButtonID);
    //   }
    // });
    //
    const confirmation=confirm('Are you sure want to delete project')
    if (confirmation){
      this.projectService.deleteProject('project',id)
        .then(response=>{
          this.response=response.data;
          if (this.response.status){
            this.toast.success({detail:"SUCCESS",summary:this.response.message,duration:2000});
          }else {
            this.toast.error({detail:"ERROR",summary:this.response.message,duration:2000});

          }
        })
    }

  }
formatDate(date: Date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // @ts-ignore
    return new Date(date).toLocaleDateString('en-US', options);
  }
}
