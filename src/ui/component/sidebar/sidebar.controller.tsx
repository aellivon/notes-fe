import LogoutCase from '../../../core/usecases/logout/logout.case'

export default class SidebarController {
  private readonly logOutUseCase: LogoutCase

  constructor () {
    this.logOutUseCase = new LogoutCase()
  }

  async logout (): Promise<any> {
    const result = await this.logOutUseCase.execute()
    return result
  }
}