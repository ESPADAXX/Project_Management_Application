import {Component} from '@angular/core';
import {Auth, User} from "../dto/user.dto.module";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {DataSharingService} from "../api/data-sharing.service";
import {UserService} from "../api/user/user.service";

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
  public photoUrl: string | undefined;
  constructor(private route: ActivatedRoute ,private router:Router ,private dataSharingService: DataSharingService,private  userService:UserService) { }

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
    this.userString = sessionStorage.getItem('user');
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
    if (this.user.id){}
    this.onGetPhoto(this.user.id)
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

  protected readonly sessionStorage = sessionStorage;
}
