import AuthRepository from '../../../../data/gateways/api/services/auth.repositories'
import LogOutCase from '../../../../domain/usecases/logout/logout.case'


export default class DashboardController {
  private readonly logOutUseCase: LogOutCase

  constructor () {
    this.logOutUseCase = new LogOutCase(new AuthRepository())
  }

  async logout (): Promise<any> {
    const result = await this.logOutUseCase.execute()
    return result
  }


}