import KnowledgebaseApiGateway from "../../../../data/gateways/api/services/knowledgebase.gateway"
import KnowledgebaseRepository from "../../../../data/gateways/api/services/knowledgebase.repositories"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import DeleteKnowledgebaseUseCase from "./deleteKnowledgebase.usecase"


describe('Delete Knowledgbase', () => {
  let useCase: DeleteKnowledgebaseUseCase
  let repo: KnowledgebaseRepository
  let apiGateway: KnowledgebaseApiGateway
  let beforeData = {
    "title": "Title",
    "description": "Desc",
    "is_public": true,
  }

  beforeEach(() => {
    apiGateway = new KnowledgebaseApiGateway()
    repo = new KnowledgebaseRepository()
    const toSet = {
      "next": null,
      "previous": null,
      "count": 1,
      "total_pages": 1,
      "results": [
          {
              "id": 1,
              "title": "Title",
              "description": "Desc",
              "is_public": true,
              "owner": 1
          }
      ],
      "current_page_number": 1
    }
    repo.setKnowledgebase(apiGateway.getKBListFromResponse(toSet))
  })

  test('execute', async () => {
    mockAPIResponses(apiGateway.apiSauce.axiosInstance)
    useCase = new DeleteKnowledgebaseUseCase(apiGateway, repo)

    let state = store.getState()

    expect(state.kbState.kb.results.length).toBe(1)
    expect(state.kbState.kb.results[0].id).toBe(1)
    expect(state.kbState.kb.results[0].title).toBe(beforeData.title)
    expect(state.kbState.kb.results[0].description).toBe(beforeData.description)
    expect(state.kbState.kb.results[0].isPublic).toBe(beforeData.is_public)

    await useCase.execute(1)
    state = store.getState()

    expect(state.usersState.users.results.length).toBe(0)
  })
})
