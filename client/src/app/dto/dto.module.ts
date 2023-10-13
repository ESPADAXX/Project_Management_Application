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
  id:Number
  fullName:String,
  email:String,
  role:{
    id:Number,
    name:String
  }|null,
  department:{
    id:Number,
    name:String
  }|null
}
export const Color: {firstColor: string, secondColor: string, thirdColor: string, green: string, LightGreen: string, yellow: string}={
  firstColor:'#36466a',
  secondColor:'#006e95',
  thirdColor: '#0098a9',
  green :'#00bfa0',
  LightGreen :'#8ae185',
  yellow :'#f9f871'
}
