import {
  ILoginResponseDataModel,
  } from '../../../domain/api/api.types'
  import { Api } from '../api'
  import { ILoginFormDataModel } from '../../../domain/login-form.entity'
  
  export default class AuthApiGateway extends Api {
    async login (form: ILoginFormDataModel): Promise<ILoginResponseDataModel> {
      return this.post<ILoginResponseDataModel>('/user/auth/login/', form)
    }
  }