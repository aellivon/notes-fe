import LogoutCase from './logout.case'
import AuthRepository from '../../../data/gateways/api/services/auth.repositories'
import { store } from '../../../presentation/presenters/store/store'

describe('Logout', () => {
  let useCase: LogoutCase


  beforeEach(() => {
    const authRepository = new AuthRepository()
    useCase = new LogoutCase(authRepository)
  })

  test('execute', async () => {
    await useCase.execute()
    const state = store.getState()
    expect(state.authState.user.id).toBe(-1)
    expect(state.authState.user.email).toBe("")
    expect(state.authState.user.firstName).toBe("")
    expect(state.authState.user.lastName).toBe("")
    expect(state.authState.tokens.accessToken).toBe("")
    expect(state.authState.tokens.refreshToken).toBe("")
  })
})
