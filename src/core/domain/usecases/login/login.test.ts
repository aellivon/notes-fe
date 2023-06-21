import LoginCase from './login.case'
import IAuthBaseGateway from '../../../data/gateways/api/services/auth.gateway'
import AuthRepository from '../../../data/gateways/api/services/auth.repositories'
import { store } from '../../../presentation/presenters/store/store'
import { mockAPIResponses } from '../../../data/infra/api-mock'
import UserProfileAuthEntity from '../../entities/users/auth/user-profile-auth.entity'
import UserAuthEntity from '../../entities/users/auth/user-tokens.entity'


describe('Login', () => {
  let useCase: LoginCase


  beforeEach(() => {
    const authApiGateway = new IAuthBaseGateway()
    mockAPIResponses(authApiGateway.apiSauce.axiosInstance)
    const authRepository = new AuthRepository()
    useCase = new LoginCase(authApiGateway, authRepository)
  })

  test('execute', async () => {
    const profile = UserProfileAuthEntity.mock()
    const tokens = UserAuthEntity.mock()
    await useCase.execute({"username": "john@sunny.com", "password": "password123"})
    const state = store.getState()
    expect(state.authState.user.id).toBe(profile.id)
    expect(state.authState.user.email).toBe(profile.email)
    expect(state.authState.user.firstName).toBe(profile.firstName)
    expect(state.authState.user.lastName).toBe(profile.lastName)
    expect(state.authState.tokens.accessToken).toBe(tokens.accessToken)
    expect(state.authState.tokens.refreshToken).toBe(tokens.refreshToken)
  })
})
