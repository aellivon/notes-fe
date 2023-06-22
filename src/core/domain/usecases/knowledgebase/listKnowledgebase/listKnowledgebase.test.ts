import KnowledgebaseApiGateway from "../../../../data/gateways/api/services/knowledgebase.gateway"
import KnowledgebaseRepository from "../../../../data/gateways/api/services/knowledgebase.repositories"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import ListKnowledgeBaseUseCase from "./listKnowledgebase.usecase"


describe('List Knowledgebase', () => {
  let useCase: ListKnowledgeBaseUseCase


  beforeEach(() => {
    const gateway = new KnowledgebaseApiGateway()
    mockAPIResponses(gateway.apiSauce.axiosInstance)
    useCase = new ListKnowledgeBaseUseCase(gateway, new KnowledgebaseRepository())
  })

  test('execute', async () => {
    let state = store.getState()
    expect(state.kbState.kb.results.length).toBe(0)
    await useCase.execute({})
    state = store.getState()
    expect(state.kbState.kb.results.length).toBe(1)
  })
})
