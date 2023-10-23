import { Component } from '@angular/core';
import {ProjectRequest, ProjectResponse} from "../../../dto/project.dto.module";
import {ProjectService} from "../../../api/project/project.service";
import {DataSharingService} from "../../../api/data-sharing.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  constructor( private projectService:ProjectService , private dataSharingService:DataSharingService) {}

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
};
  submitForm() {
    this.projectService.project("project",this.formData)
      .then(
        response=>{

          this.response=response.data

          console.log(this.response.errors[0])
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
