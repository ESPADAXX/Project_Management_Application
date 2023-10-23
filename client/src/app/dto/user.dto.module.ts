export interface Login{
  email:String,
  password:String,
}
export interface Register{
  fullName:any,
  email:String,
  confirmationPassword: String,
  password:String
}
export interface User{
  id:number
  fullName:string,
  pathPic:string,
  email:string,
  phone:string,
  role:{
    id:number,
    name:string
  }|null,
  department:{
    id:number,
    name:string
  }|null
}
export interface Auth{
  id:Number
  fullName:String,
  email:String,
}
export const Color: {firstColor: string, secondColor: string, thirdColor: string, green: string, LightGreen: string, yellow: string}={
  firstColor:'#36466a',
  secondColor:'#006e95',
  thirdColor: '#0098a9',
  green :'#00bfa0',
  LightGreen :'#8ae185',
  yellow :'#f9f871'
}




