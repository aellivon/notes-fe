import { store } from '../../../presentation/presenters/store/store'
import { clearUser } from '../../../presentation/presenters/store/reducers/auth.reducer'
export default class LoginCase {

  async execute (): Promise<any> {
    try {
      store.dispatch(clearUser())
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