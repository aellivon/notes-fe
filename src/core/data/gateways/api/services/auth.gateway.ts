import {
  ILoginResponseDataModel,
  IRefreshResponseModel,
} from '../api.types'
import { ILoginFormDataModel } from '../../../../domain/entities/formModels/login-form.entity'
import { Api } from '../../../infra/api'

import UserProfileEntity, { IAuthenticatedUserProfile } from '../../../../domain/entities/users/auth/user-profile-auth.entity';
import UserEntity from '../../../../domain/entities/users/user.entity';
import { setUserAuthAttributes } from './mappers/user.auth.mapper';


export interface IAuthBaseGateway {
  login: (form: ILoginFormDataModel) => Promise<ILoginResponseDataModel>
  getUserEntityFromLoginResponse: (response: ILoginResponseDataModel) => UserEntity
}

export interface IRefreshFormDataModel {
  refresh: string;
}

export default class AuthApiGateway extends Api implements IAuthBaseGateway {

  async login (form: ILoginFormDataModel): Promise<ILoginResponseDataModel> {
    return await this.post<ILoginResponseDataModel>('/user/auth/login/', form)
  }

  // Mapper
  getUserEntityFromLoginResponse(response: ILoginResponseDataModel): UserEntity {
    let entity = new UserProfileEntity()

    // Map here so entities does not know anything about the database
    entity.setEntity(
      setUserAuthAttributes(response, {})
    )

    return entity
  }

  async refresh (form: IRefreshFormDataModel): Promise<IRefreshResponseModel> {
      return this.post<IRefreshResponseModel>('/user/auth/token/refresh/', form)
  }
}