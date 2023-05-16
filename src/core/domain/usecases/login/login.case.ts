
import UserEntity from '../../entities/users/auth/user-profile-auth.entity'
import { ILoginFormDataModel } from '../../entities/formModels/login-form.entity'

import { store } from '../../../presentation/presenters/store/store'
import { setUser } from '../../../presentation/presenters/store/reducers/auth.reducer'
import AuthApiGateway from '../../../data/gateways/api/services/auth.gateway'

interface LoginBaseUsecase {
  execute: (params: ILoginFormDataModel) => Promise<any>
}

export default class LoginCase implements LoginBaseUsecase {
  constructor (
    private readonly authApiGateway: AuthApiGateway,
  ) {
  }

  async execute (loginForm: ILoginFormDataModel): Promise<any> {
    try {
      const userInfoModel = await this.authApiGateway.login(loginForm)
      const user = new UserEntity()
      user.setFromApiModel(userInfoModel)
      store.dispatch(setUser(user.getCurrentValues()))

      return {
        'success': true,
        'data': user
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
