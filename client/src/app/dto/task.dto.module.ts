import {Project} from "./project.dto.module";
import {User} from "./user.dto.module";
import {Department} from "./department.dto.module";

export interface TasksColors {
  status:String
  title:String
  description:String
  dateFin:Date
  color:String
  time:String
  icon:String
}

export interface Tasks {
  id:number,
  status:string
  title:string
  description:string
  dateFin:Date
  dateDebut:Date
  project:{
    id: number,
    title: string,
    description: string,
    dateDebut: string,
    "dateFin": string,
    "client": {
      "id": number,
      "name": string
    },
    "price": number
  }
  "department": {
    id: number,
      name: string
    }
  user:{
    "id": number,
      "fullName": string,
      "pathPic": string|null,
      "email": string,
      "phone":string| null,
      "role": {
        "id": number,
          "name": string
        },
      department:{
        id:number,
        name:string
    }
    }
}
export interface TaskResponse{
  status:boolean,
  errors: {
    id:number,
    status:string
    title:string
    description:string
    date:string,
    project:string,
    department: string,
    user:string,
  }[],
  message:string|undefined
}
export interface TaskPage{
  content:Tasks[],
  pageable: {
    pageNumber: number,
    pageSize: number,
  }
  totalPages: number
}
export interface TaskRequest{
  status:string|undefined
  title:string
  description:string
  dateFin:Date
  dateDebut:Date
  project:number|undefined
  department: number|undefined
  user:number|undefined
}
export interface TaskData {
  taskCount: number;
  departmentName: string;
  taskStatus: string;
}

export interface TaskStatusCounts {
  [status: string]: number;
}

export interface Percentages {
  [departmentName: string]: number;
}
