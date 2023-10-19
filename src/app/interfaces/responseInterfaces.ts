export class OpTimeObj {
    t?: number;
    ts?: string;
}

export class SignatureObj {
    hash?: string;
    keyId?: string;
}

export class ClusterTimeObj {
    clusterTime?: string;
    signature?: SignatureObj;
}

export interface IRegisterResponse {
    message: string;
}

export interface ILoginResponse {
    isAdmin: boolean;
    isActive: boolean;
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    email: string;
    photoId: string;
    createddate: string;
    _v: number;
    token: string;
}

export interface IGetAllPostResponse {
    isAdmin: boolean;
    isActive: boolean;
    _id: string;
    id: string;
    userId: string;
    userPhotoId: string;
    userName: string;
    post: string;
    postImageId?: string;
    profession: string;
    createdDate: string;
    __v: number;
}

export interface IUserList {
    _id: string;
    isAdmin: boolean;
    isActive: boolean;
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    phone:string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    profession?: string;
    email: string;
    photoId: string;
    createdDate: string;
    __v: number;
    id: string;

}

export interface IFriend {
    _id: string;
    id: string;
    userId: string;
    friendId: string;
    status: string;
    createdDate: string;
    __v: number;
}