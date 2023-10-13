import {Component} from '@angular/core';
import {User} from "../dto/dto.module";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  color:string="white"
  isSidebarOpen: boolean =true;
  currentSidebarTab: Boolean =true;
  isOpen: boolean = true;
  toggleTheme: any;
  user: User ={
    id:0,
    fullName:'',
    email:'',
    role:{
      id:0,
      name:'String'
    },
    department:{
      id:0,
      name:''
    }
  };
  element:any|undefined
  imageDashboardWhite: string= `assets/img/dashboard-${this.color}.png`;
  imageProjectWhite: string= `assets/img/project-${this.color}.png`;
  imageTaskWhite: string= `assets/img/task-${this.color}.png`;
  imageUserWhite: string= `assets/img/user-${this.color}.png`;

  clickedElement: String='dashboard';
  constructor(private route: ActivatedRoute ,private router:Router ) { }

  isOpenSideBar(){
    this.isSidebarOpen=!this.isSidebarOpen
  }
  ngOnInit(): void {

    const userString = sessionStorage.getItem('user'); // Retrieve the user string from sessionStorage

    if (userString) {
      this.user= JSON.parse(userString) as User;
    } else {
      const navigationExtras: NavigationExtras = {
        skipLocationChange: true,
        replaceUrl: true,
      };
      this.router.navigate(['/login'], navigationExtras)
    }
  }



  liIsClicked(element:string) {
    this.clickedElement=element
      // switch (element){
      //     case "dashboard":
      //         this.imageDashboard = `assets/img/${element}-white.png`;
      //         break;
      //     case "project":
      //         this.imageProject = `assets/img/${element}-white.png`;
      //         break;
      //     case "task":
      //         this.imageTask = `assets/img/${element}-white.png`;
      //         break;
      //     case "user":
      //         this.imageUser = `assets/img/${element}-white.png`;
      //         break;
      // }
  }
}
