import {
  ILoginResponseDataModel,
  IRefreshResponseModel,
} from '../api.types'
import { ILoginFormDataModel } from '../../../../domain/entities/formModels/login-form.entity'
import { Api } from '../../../infra/api'

import { IAuthenticatedUserProfile } from '../../../../domain/entities/users/auth/user-profile-auth.entity';


export interface IAuthBaseGateway {
  login: (form: ILoginFormDataModel) => Promise<ILoginResponseDataModel>
  getUserEntityFromLoginResponse: (response: ILoginResponseDataModel) => IAuthenticatedUserProfile
}

export interface IRefreshFormDataModel {
  refresh: string;
}

export default class AuthApiGateway extends Api implements IAuthBaseGateway {

  constructor () {
    super()
  }

  async login (form: ILoginFormDataModel): Promise<ILoginResponseDataModel> {
    return await this.post<ILoginResponseDataModel>('/user/auth/login/', form)
  }

  // Mapper
  getUserEntityFromLoginResponse(response: ILoginResponseDataModel): IAuthenticatedUserProfile {
    return {
      id: response.user.id,
      email: response.user.email,
      firstName: response.user.first_name,
      displayName: response.user.display_name,
      lastName: response.user.last_name,
      accessToken: response.access_token,
      refreshToken: response.refresh_token,
      avatarURL: response.user.avatar_url
    }
  }

  async refresh (form: IRefreshFormDataModel): Promise<IRefreshResponseModel> {
      return this.post<IRefreshResponseModel>('/user/auth/token/refresh/', form)
  }

}