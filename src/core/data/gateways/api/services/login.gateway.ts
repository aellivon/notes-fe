import {
  ILoginResponseDataModel,
  } from '../api.types'
import { Api } from '../../../infra/api'
import { ILoginFormDataModel } from '../../../../domain/entities/formModels/login-form.entity'
  
  export default class AuthApiGateway extends Api {
    async login (form: ILoginFormDataModel): Promise<ILoginResponseDataModel> {
      return this.post<ILoginResponseDataModel>('/user/auth/login/', form)
    }
  }
