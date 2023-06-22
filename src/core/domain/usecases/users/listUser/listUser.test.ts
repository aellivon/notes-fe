import UserApiGateway from "../../../../data/gateways/api/services/user.gateway"
import UsersRepository from "../../../../data/gateways/api/services/users.repositories"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import ListUsersUseCase from "./listUser.usecase"


describe('List User', () => {
  let useCase: ListUsersUseCase


  beforeEach(() => {
    const gateway = new UserApiGateway()
    mockAPIResponses(gateway.apiSauce.axiosInstance)
    useCase = new ListUsersUseCase(gateway, new UsersRepository())
  })

  test('execute', async () => {
    let state = store.getState()
    expect(state.usersState.users.results.length).toBe(0)
    await useCase.execute({})
    state = store.getState()
    expect(state.usersState.users.results.length).toBe(1)
  })
})
