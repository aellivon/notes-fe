import {
  ILoginResponseDataModel,
  IRefreshResponseModel,
} from '../api.types'
import { IRefreshFormDataModel } from '../../../../domain/entities/formModels/refresh-form.entity'
import { ILoginFormDataModel } from '../../../../domain/entities/formModels/login-form.entity'
import { Api } from '../../../infra/api'
  
export default class AuthApiGateway extends Api {
    async login (form: ILoginFormDataModel): Promise<ILoginResponseDataModel> {
      return this.post<ILoginResponseDataModel>('/user/auth/login/', form)
    }
    async refresh (form: IRefreshFormDataModel): Promise<IRefreshResponseModel> {
        return this.post<IRefreshResponseModel>('/user/auth/token/refresh/', form)
    }
}