import AuthApiGateway from '../../services/api/gateways/login.gateway'
import UserEntity from '../../domain/user-profile-auth.entity'
import { ILoginFormDataModel } from '../../domain/login-form.entity'
// import { GroupListEntity } from '../../../common/entities/groups.entity'
import { store } from '../../services/store/store'
import { setUser } from '../../services/store/reducers/auth.reducer'
export default class LoginCase {
  constructor (
    private readonly authApiGateway: AuthApiGateway,
  ) {
  }

  async execute (loginForm: ILoginFormDataModel): Promise<any> {
    try {
      const userInfoModel = await this.authApiGateway.login(loginForm)
      const user = new UserEntity()
      console.log(userInfoModel)
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