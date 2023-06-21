


import GroupApiGateway from "../../../data/gateways/api/services/group.gateway"
import GroupsRepository from "../../../data/gateways/api/services/group.repositories"
import { mockAPIResponses } from "../../../data/infra/api-mock"
import { store } from "../../../presentation/presenters/store/store"
import ListGroupUseCase from "./listGroup.usecase"


describe('List Groups', () => {
  let useCase: ListGroupUseCase


  beforeEach(() => {
    const gateway = new GroupApiGateway()
    mockAPIResponses(gateway.apiSauce.axiosInstance)
    useCase = new ListGroupUseCase(gateway, new GroupsRepository())
  })

  test('execute', async () => {
    let state = store.getState()
    expect(state.groupState.groups.results.length).toBe(0)
    await useCase.execute({})
    state = store.getState()
    expect(state.groupState.groups.results.length).toBe(1)
  })
})
