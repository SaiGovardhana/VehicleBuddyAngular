export type userModel={name?:string,email?:string,role?:string,password?:string};

export type VehicleModel={bookings:string[],_id:string,vehicleprice:string,selleremail:string,location:string,fullmodel:string,pic:string};
export type BasicObject={[key:string]:any};

export type SignUpRequestModel={"name"?:string,"password"?:string,"role"?:string,"email"?:string};