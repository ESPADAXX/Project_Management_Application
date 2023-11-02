import {Component} from '@angular/core';
import {TaskService} from "../../../api/task/task.service";
import {DataSharingService} from "../../../api/data-sharing.service";
import {NgToastService} from "ng-angular-popup";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../../api/user/user.service";
import {PasswordResponse, PhotoResponse, User, UserRequest, UserResponse} from "../../../dto/user.dto.module";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
    private id: number | undefined;
    componentSide='infos'
    public photoResponse: PhotoResponse | undefined;
    public photoUrl: string | undefined;
    constructor( private taskService:TaskService,
                 private dataSharingService:DataSharingService,
                 private toast:NgToastService,
                 private router:Router,
                 private userService:UserService,
                 private route:ActivatedRoute
    ) {}

    public userConnected:any
    formData:UserRequest={
        fullName:'',
        email:'',
        phone:'',
        role:0,
        department: 0,
    }

    response:UserResponse={
        status:true,
        errors: [],
        message:''
    };
  passwordResponse:PasswordResponse={
    status:true,
    errors: [],
    message:''
  };
    userResponse: User={
        id: 0,
        fullName: '',
        pathPic: '',
        email: '',
        phone:'',
        role: {
            id: 0,
            name: ''
        },
        department:{
            id:0,
            name:''
        }
    }
  newPassword: string|undefined;
  confirmPassword: string|undefined;
  oldPassword: string|undefined;
  photoValue: File | undefined;


    submitForm() {
        console.log(this.formData)
        this.userService.updateUser("user",this.userResponse.id,this.formData)
            .then(
                response=>{
                    this.response=response.data
                    if (this.response.status){
                        this.toast.success({detail:"SUCCESS",summary:this.response.message,duration:2000});
                        this.router.navigate(['/user'])
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
        this.userConnected = JSON.parse(<string>sessionStorage.getItem('user'))
        const navigationPlace = 'user';
        this.dataSharingService.setVariable(navigationPlace);
        if(this.id){
            this.userService.getUserById('user',this.id)
                .then(

                    response=>{
                        this.userResponse=response.data
                        this.formData.fullName=this.userResponse.fullName
                        this.formData.phone=this.userResponse.phone
                        this.formData.email=this.userResponse.email
                        this.formData.department=this.userResponse.department?.id
                        this.formData.role=this.userResponse.role?.id
                        console.log(this.userConnected.id)
                        console.log(this.userResponse.id)

                    }
                )
                .catch(error=>{
                        console.error(error)
                    }
                )
          this.onGetPhoto(this.id)
        }

    }

  changePassword() {
      if (this.id){
        this.userService.changePassword('user/password',this.id,this.oldPassword,this.newPassword,this.confirmPassword)
          .then(
            response=>{
              this.passwordResponse=response.data
              console.log(this.passwordResponse)
              if (this.passwordResponse.status){
                this.toast.success({detail:"SUCCESS",summary:this.passwordResponse.message,duration:2000});
                this.componentSide='infos'

              }else {
                this.toast.error({detail:"ERROR",summary:this.passwordResponse.message,duration:2000});
              }
            }
          )
          .catch(error=>{
            console.error(error)
          })
      }

  }

  changePhoto(files: FileList | null): void {
    if (files && files.length > 0 && this.id) {
      this.photoValue = files[0];
      this.userService.changePhoto('user/image',this.id,this.photoValue)
        .then(response=>{
          this.photoResponse=response.data
          if (this.photoResponse.status){
            this.toast.success({detail:"SUCCESS",summary:this.photoResponse.message,duration:2000});
            this.componentSide='infos'
            this.onGetPhoto(this.id);
          }else {
            this.toast.error({detail:"ERROR",summary:this.photoResponse.message,duration:2000});
          }
        })
        .catch(
          error=>{
            console.error(error)
          })

      this.onGetPhoto(this.id)
    }



    }

  onGetPhoto(id: number | undefined) {
      if (id){
    this.userService.getUserPhoto('user/image', id)
      .then((response) => {
        if (response.status === 200) {
          const blob = new Blob([response.data], { type: 'image/jpeg' });
          this.photoUrl = URL.createObjectURL(blob);
        } else {
          console.error('Failed to retrieve the photo.');
        }
      })
      .catch((error) => {
        console.error('An error occurred while fetching the photo:', error);
      });
  }
}
}
