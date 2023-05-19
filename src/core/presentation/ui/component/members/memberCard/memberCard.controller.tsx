import AuthRepository from '../../../../../data/gateways/api/services/auth.repositories'
import LogOutCase from '../../../../../domain/usecases/logout/logout.case'
import SetNavBarCase from '../../../../../domain/usecases/setNavbarStatus/navbar.case'


export default class SidebarController {
  private readonly logOutUseCase: LogOutCase
  private readonly setNavBarCase: SetNavBarCase

  constructor () {
    this.logOutUseCase = new LogOutCase(new AuthRepository())
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