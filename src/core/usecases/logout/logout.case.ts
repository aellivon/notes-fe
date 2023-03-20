// import { GroupListEntity } from '../../../common/entities/groups.entity'
import { store } from '../../services/store/store'
import { clearUser } from '../../services/store/reducers/auth.reducer'
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