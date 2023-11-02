import {Client} from "./client.dto.module";

export interface Project{
  "id": number,
  "title": string,
  "description": string,
  "dateDebut": Date,
  "dateFin": Date
  "price":number,
  client:string|null
}
export interface ProjectRequest{
  title: string,
  description: string,
  dateDebut: Date,
  dateFin: Date
  price:number|null,
  client:string
}
export interface ProjectResponse{
  status:boolean,
    errors: {
        title?: string;
        description?: string;
        dateDebut?: string;
        dateFin?: string;
        price?: string;
        client?: string;
        date?: string;
    }[],
  message:string|undefined
}
export interface ProjectPage{
  content:Project[],
  pageable: {
    pageNumber: number,
    pageSize: number,}
  totalPages: number
}
