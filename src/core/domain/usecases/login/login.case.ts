import { ILoginFormDataModel } from '../../entities/formModels/login-form.entity'

import IAuthBaseGateway from '../../../data/gateways/api/services/auth.gateway'
import AuthRepository from '../../../data/gateways/api/services/auth.repositories'

interface LoginBaseUsecase {
  execute: (params: ILoginFormDataModel) => Promise<any>
}

export default class LoginCase implements LoginBaseUsecase {
  constructor (
    private readonly dataGateway: IAuthBaseGateway,
    private readonly authRepository: AuthRepository
  ) {
  }

  async execute (loginForm: ILoginFormDataModel): Promise<any> {
    try {
      const userInfoModel = await this.dataGateway.login(loginForm)
      const entities = this.dataGateway.extractEntitiesFromLoginResponse(userInfoModel)
      this.authRepository.setLoggedInUser(entities.user.getCurrentValues())
      this.authRepository.setUserTokens(entities.tokens.getCurrentValues())

      return {
        'success': true,
        'data': null
      }
    } catch (error) {
      console.log({ error })
      return {
        'success': false,
        'data': error
      }
    }
  }
}
