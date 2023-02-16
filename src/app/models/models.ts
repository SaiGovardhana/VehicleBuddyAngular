export type userModel={username?:string,email?:string,role?:string};

export type ModalDataObject={"showButton"?:boolean,"title"?:string,
buttonText?:string,state?:string
};
export type BasicObject={[key:string]:string|boolean|number};

export type SignUpRequesModel={"name"?:string,"password"?:string,"role"?:string,"email"?:string};