import { Component } from '@angular/core';
import {ProjectService} from "../../../api/project/project.service";
import {DataSharingService} from "../../../api/data-sharing.service";
import {Project, ProjectRequest, ProjectResponse} from "../../../dto/project.dto.module";
import {ActivatedRoute, Router} from "@angular/router";
import {id} from "date-fns/locale";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent {
  private id: number=0;
  constructor( private projectService:ProjectService,
               private dataSharingService:DataSharingService,
               private route:ActivatedRoute,
               private router:Router,
               private toast:NgToastService,
  ) {}


  projectResponse:Project={
    id:0,
    title:'',
    description:'',
    dateFin:new Date(),
    dateDebut:new Date(),
    price:0,
    client:''
  };
  formData:Project={
      id:0,
      title:'',
      description:'',
      dateDebut:new Date(),
      dateFin:new Date(),
      price:0,
      client:''

    }
  response:ProjectResponse={
    status:true,
    errors: [],
    message:''
  };
  submitForm() {

    this.projectService.editProject("project", this.id,this.formData)
        .then(
            response=>{

              this.response=response.data
              if (this.response.status){
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
    this.route.paramMap.subscribe(params => {
          this.id = parseInt(<string>params.get('id'))
        })
    this.projectService.projectById('project',this.id)
        .then(
            response=>{
              this.projectResponse=response.data
              this.formData=response.data
            }
        )
        .catch(
            error=>{
              console.error(error)
            }
        )
    const navigationPlace = 'project';
    this.dataSharingService.setVariable(navigationPlace);
  }
}
