export interface signUp {
  name: string;
  email: string;
  password: string;
}
export interface login {
  email: String;
  password: String;
}
export interface User{
  id: number;
  name:string;
  email: string;
  password:string;
}


export interface product{
  name:string;
  price:number;
  priceDiscount:number;
  category:string;
  categoryId:number;
  color:string;
  image:string;
  description:string;
  id:number;
  quantity:undefined | number;
  productId:undefined|number;
  rating:any;
  comment:any;
  cpu : string;
  ram: string;
  drive:string;
  card:string;
  monitor:string;
  conecttionport:string[];
  keyboard:string;
  lan:string;
  wifi:string;
  bluetooth:string;
  audio:string[];
  webcam:string;
  system:string;
  battery:string;
  weight:string;
  size:string;

}
export interface cart{
  name:string;
  price:number;
  category:string;
  color:string;
  image:string;
  description:string;
  id:number| undefined;
  quantity:undefined | number;
  productId:number;
  userId:number;
}

export interface priceSummary{
  price:number;
  discount:number;
  tax:number;
  delivery:number;
  total:number;
}

export interface order {
  email:string;
  address:string;
  contact:string;
  totalPrice:number;
  userId:string;
  id:number|any;
  status:string;
}

export interface category {
  id: number ;
  name: string;
  image:string;
}
export interface contact {
  id: number ;
  name: string;
  phone:number;
  comment:string;
  email:string;
}
 export interface reviews{
  id : number;
  rating: number;
  comment:string;
  productId : number;
  userId:number;
  date_create:any
}

 export interface ReposeReview{
  review: reviews[] ;
}
