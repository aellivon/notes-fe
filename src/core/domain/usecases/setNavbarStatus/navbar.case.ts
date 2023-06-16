import { store } from '../../../presentation/presenters/store/store'
import { setNavbar } from '../../../presentation/presenters/store/reducers/appState.reducer'

export default class SetNavBarCase {

  async execute (state: boolean): Promise<any> {
    try {
      store.dispatch(setNavbar(state))
    } catch (error) {
      console.log({ error })
    }
  }
}