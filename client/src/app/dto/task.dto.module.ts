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
