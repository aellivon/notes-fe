import LoginCase from '../../../../domain/usecases/login/login.case'
import { ILoginFormDataModel } from '../../../../domain/entities/formModels/login-form.entity'
import AuthApiGateway from '../../../../data/gateways/api/services/auth.gateway'


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