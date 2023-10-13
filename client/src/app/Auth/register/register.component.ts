import { Component } from '@angular/core';
import {Register} from "../../dto/dto.module";
import {UserService} from "../../api/user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

    formData: Register = {
    fullName:null,
    email: '',
    confirmationPassword: '',
    password: ''
  } ;

    errorMessage: any ={
      fieldName:{
          email:false,
          fullName:false,
          password: false,
          confirmationPassword: false
      },
      message:{
        email:'',
        fullName:'',
        password: '',
        confirmationPassword:''
    },
    };
  constructor(private userService: UserService, private router: Router) {}
  response:String=''
    submitForm(){
        // Reset field name flags to false
        this.errorMessage.fieldName.email = false;
        this.errorMessage.fieldName.fullName = false;
        this.errorMessage.fieldName.password = false;
        this.errorMessage.fieldName.confirmationPassword = false;
            this.userService.register('register', this.formData).subscribe(
                (response) => {
                    this.response = response.message;
                    this.router.navigate(['/login'])
                },
                (error) => {
                    if(error.error.email){
                        this.errorMessage.message.email = error.error.email;
                        this.errorMessage.fieldName.email=true;
                    }if(error.error.password){
                        this.errorMessage.message.password = error.error.password;
                        this.errorMessage.fieldName.password=true;
                    }if(error.error.fullName){
                        this.errorMessage.message.fullName = error.error.fullName;
                        this.errorMessage.fieldName.fullName=true;
                    }if(error.error.confirmationPassword){
                        this.errorMessage.message.confirmationPassword = error.error.confirmationPassword;
                        this.errorMessage.fieldName.confirmationPassword=true;
                    }
                    console.log(this.errorMessage)
                }
            );
        }
}


