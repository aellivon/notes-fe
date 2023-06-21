import SetNavBarCase from './navbar.case'
import { store } from '../../../presentation/presenters/store/store'

describe('Set Navbar', () => {
  let useCase: SetNavBarCase


  beforeEach(() => {
    useCase = new SetNavBarCase()
  })

  test('execute', async () => {
    await useCase.execute(true)
    const state = store.getState()
    expect(state.appUIState.hiddenNavbar).toBe(true)
  })

  test('execute', async () => {
    await useCase.execute(false)
    const state = store.getState()
    expect(state.appUIState.hiddenNavbar).toBe(false)
  })
})
