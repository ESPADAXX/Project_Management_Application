import { Component } from '@angular/core';
import { UserService } from '../../api/user/user.service';
import {Login, User} from "../../dto/user.dto.module";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  formData: Login = {
    email: '',
    password: ''
  };

  errorMessage: any = {
    fieldName: {
      email: false,
      password: false,
      fields:''
    },
    message: {
      email: '',
      password: '',
      fields:''
    }
  };
  user: User | undefined
  response: string = '';

  constructor(private userService: UserService,private router:Router) {}

  submitForm() {
    this.errorMessage.fieldName.email = false;
    this.errorMessage.fieldName.password = false;

    this.userService.login('login', this.formData).subscribe(
        (response) => {
          this.response = response.message;
          this.user=response.user
          sessionStorage.setItem('user', JSON.stringify(response.user));

            this.router.navigate(['/']);
        },
        (error) => {
          if (error.error.email) {
            this.errorMessage.message.email = error.error.email;
            this.errorMessage.fieldName.email = true;
          }
          if (error.error.password) {
            this.errorMessage.message.password = error.error.password;
            this.errorMessage.fieldName.password = true;
          }else{
            this.errorMessage.message.fields=error.error.message
            this.errorMessage.fieldName.fields = true;
          }
          console.log(this.errorMessage);
        }
    );
  }
}
