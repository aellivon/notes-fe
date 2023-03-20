import LogoutCase from '../../../../core/usecases/logout/logout.case'
import SetNavBarCase from '../../../../core/usecases/setNavbarStatus/navbar.case'

export default class SidebarController {
  private readonly logOutUseCase: LogoutCase
  private readonly setNavBarCase: SetNavBarCase

  constructor () {
    this.logOutUseCase = new LogoutCase()
    this.setNavBarCase = new SetNavBarCase()
  }

  async logout (): Promise<any> {
    const result = await this.logOutUseCase.execute()
    return result
  }

  async setNavbarStatus (state: boolean): Promise<any> {
    const result = await this.setNavBarCase.execute(state)
    return result
  }
}