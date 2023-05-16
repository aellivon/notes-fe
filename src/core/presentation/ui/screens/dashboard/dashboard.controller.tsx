import LogoutCase from '../../../../domain/usecases/logout/logout.case'

export default class DashboardController {
  private readonly logOutUseCase: LogoutCase

  constructor () {
    this.logOutUseCase = new LogoutCase()
  }

  async logout (): Promise<any> {
    const result = await this.logOutUseCase.execute()
    return result
  }


}