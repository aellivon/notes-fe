import {
  ILoginResponseDataModel,
  IRefreshResponseModel,
} from '../api.types'
import { ILoginFormDataModel } from '../../../../domain/entities/formModels/login-form.entity'
import { Api } from '../../../infra/api'

import UserProfileEntity from '../../../../domain/entities/users/auth/user-profile-auth.entity';
import UserAuthEntity from '../../../../domain/entities/users/auth/user-tokens.entity';
import { setUserAuthAttributes, transformInitialLoginTokenResponse } from './mappers/user.auth.mapper';
import { LOGIN_URL } from '../constants';

export interface IAuthBaseGateway {
  login: (form: ILoginFormDataModel) => Promise<ILoginResponseDataModel>
  extractEntitiesFromLoginResponse: (response: ILoginResponseDataModel) => IMappedLoginResponse
}

interface IMappedLoginResponse {
  user: UserProfileEntity,
  tokens: UserAuthEntity
}

export default class AuthApiGateway extends Api implements IAuthBaseGateway {

  async login (form: ILoginFormDataModel): Promise<ILoginResponseDataModel> {
    return await this.post<ILoginResponseDataModel>(LOGIN_URL, form)
  }

  // Mapper
  extractEntitiesFromLoginResponse(response: ILoginResponseDataModel): IMappedLoginResponse {
    let entity = new UserProfileEntity()

    // Map here so entities does not know anything about the database
    entity.setEntity(
      setUserAuthAttributes(response, {})
    )
  
    let tokens = new UserAuthEntity()

    tokens.setEntity(
      transformInitialLoginTokenResponse(response)
    )

    return {
      user: entity,
      tokens: tokens
    }
  }
}