export type userDataSliceType = {
    loading: boolean,
    error: null | string,
    authUserInfo: {
        isAuth: boolean,
        userData: userDataType | null,
    },
}

export type userDataType = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  region: string;
  city: string;
  street: string;
  postIndex: string;
  homeIndex: string;
  password?: string;
  role: string;
  ID: string;
}