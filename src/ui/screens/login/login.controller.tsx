import LoginCase from '../../../core/usecases/login/login.case'
import AuthApiGateway from '../../../core/services/api/gateways/login.gateway'
import { ILoginFormDataModel } from '../../../core/domain/login-form.entity'

export default class LoginController {
  private readonly loginUseCase: LoginCase

  constructor () {
    const authGateway = new AuthApiGateway()
    this.loginUseCase = new LoginCase(authGateway)
  }

  async login (values: ILoginFormDataModel): Promise<any> {
    const result = await this.loginUseCase.execute(values)
    return result
  }
}