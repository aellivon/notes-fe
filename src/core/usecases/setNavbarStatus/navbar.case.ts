// import { GroupListEntity } from '../../../common/entities/groups.entity'
import { store } from '../../services/store/store'
import { setNavbar } from '../../services/store/reducers/appState.reducer'
export default class SetNavBarCase {

  async execute (state: boolean): Promise<any> {
    try {
      store.dispatch(setNavbar(state))
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