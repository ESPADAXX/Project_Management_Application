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
