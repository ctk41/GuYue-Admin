export interface Result {
  code: string;
  msg: string;
}

export interface ResultData<T = any> extends Result {
  data: T;
}

export interface ResPage<T> {
  list: T[];
  pageNum: number;
  pageSize: number;
  total: number;
}

export interface ReqPage {
  pageNum: number;
  pageSize: number;
}

export namespace Login {
  export interface ReqLoginForm {
    username: string;
    password: string;
  }
  export interface ResLogin {
    access_token: string;
  }
  export interface ResAuthButtons {
    [key: string]: string[];
  }
}

export namespace User {
  export interface ReqUserParams extends ReqPage {
    username: string;
    gender: number;
    idCard: string;
    email: string;
    address: string;
    createTime: string[];
    status: number;
  }
  export interface ResUserList {
    id: string;
    username: string;
    gender: number;
    user: { detail: { age: number } };
    idCard: string;
    email: string;
    address: string;
    createTime: string;
    status: number;
    avatar: string;
    photo: any[];
    children?: ResUserList[];
  }
}

export namespace Role {
  export interface RoleList {
    id: string;
    createTime: string;
    updateTime: string;
    name: string;
    status: number;
    type: number;
  }
}
