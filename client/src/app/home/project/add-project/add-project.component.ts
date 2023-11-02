import { Component } from '@angular/core';
import {ProjectRequest, ProjectResponse} from "../../../dto/project.dto.module";
import {ProjectService} from "../../../api/project/project.service";
import {DataSharingService} from "../../../api/data-sharing.service";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  constructor( private projectService:ProjectService,
               private dataSharingService:DataSharingService,
               private toast:NgToastService,
               private router:Router
  ) {}

formData:ProjectRequest={
  title:'',
  description:'',
  dateDebut:new Date(),
  dateFin:new Date(),
  price:null,
  client:''

}

response:ProjectResponse={
  status:true,
    errors: [],
  message:''
};
  submitForm() {
    this.projectService.project("project",this.formData)
      .then(
        response=>{
          this.response=response.data
          if(this.response.status){
            this.toast.success({detail:"SUCCESS",summary:this.response.message,duration:2000});
            this.router.navigate(['/project'])
          }else {
            this.toast.error({detail:"ERROR",summary:this.response.message,duration:2000});
          }
        }
      )
      .catch(
        error=>{
          console.log(error)
        }
      )

  }

  ngOnInit(){
    const navigationPlace = 'project';
    this.dataSharingService.setVariable(navigationPlace);
  }
}
