import { store } from '../../../presentation/presenters/store/store'
import { clearUser } from '../../../presentation/presenters/store/reducers/auth.reducer'
import AuthRepository from '../../../data/gateways/api/services/auth.repositories'

export default class LogOutCase {

  constructor (
    private readonly authRepository: AuthRepository
  ) {
  }
  
  async execute (): Promise<any> {
    try {
      this.authRepository.clearLoggedInUser()
      return {
        'success': true
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