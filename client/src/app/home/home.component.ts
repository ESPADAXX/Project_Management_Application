import {Component} from '@angular/core';
import {Auth, User} from "../dto/user.dto.module";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {DataSharingService} from "../api/data-sharing.service";

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
    pathPic:'',
    email:'',
    phone:'',
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
  constructor(private route: ActivatedRoute ,private router:Router ,private dataSharingService: DataSharingService) { }

  isOpenSideBar(){
    this.isSidebarOpen=!this.isSidebarOpen
  }
  public userDetails:String=''
  public userString:Auth={
    id:0,
    fullName:'',
    email:'',
  }
  ngOnInit(): void {
    this.dataSharingService.getVariable().subscribe((variable) => {
      this.clickedElement = variable;
    });
    // @ts-ignore
    this.userString = sessionStorage.getItem('user')!;
    this.userDetails='user/'+ this.userString.id
    if (this.userString) {
      // @ts-ignore
      this.user= JSON.parse(this.userString) as User;
    } else {
      const navigationExtras: NavigationExtras = {
        skipLocationChange: true,
        replaceUrl: true,
      };
      this.router.navigate(['/login'], navigationExtras)
    }
  }


}
