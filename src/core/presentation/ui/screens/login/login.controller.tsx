import LoginCase from '../../../../domain/usecases/login/login.case'
import { ILoginFormDataModel } from '../../../../domain/entities/formModels/login-form.entity'
import AuthApiGateway from '../../../../data/gateways/api/services/auth.gateway'
import AuthRepository from '../../../../data/gateways/api/services/auth.repositories'


export default class LoginController {
  private readonly loginUseCase: LoginCase

  constructor () {
    const authGateway = new AuthApiGateway()
    const authRepository = new AuthRepository()
    this.loginUseCase = new LoginCase(authGateway, authRepository)
  }

  async login (values: ILoginFormDataModel) {
    await this.loginUseCase.execute(values)
  }
}