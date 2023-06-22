import KnowledgebaseApiGateway from "../../../../data/gateways/api/services/knowledgebase.gateway"
import KnowledgebaseRepository from "../../../../data/gateways/api/services/knowledgebase.repositories"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import UpdateKnowledgebaseUseCase from "./updateKnowledgebase.usecase"

describe('Update Knowledgebase', () => {
  let useCase: UpdateKnowledgebaseUseCase
  let repo: KnowledgebaseRepository
  let apiGateway: KnowledgebaseApiGateway
  let beforeData = {
    "title": "Title",
    "description": "Desc",
    "isPublic": false
  }
  let afterData = {
    "title": "Title 2",
    "description": "Desc 2",
    "isPublic": true
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
              "is_public": false,
              "owner": 1
          }
      ],
      "current_page_number": 1
    }
    repo.setKnowledgebase(apiGateway.getKBListFromResponse(toSet))
  })

  test('execute with error', async () => {
    const simulatedError = {
      title: "This field may not be blank."
    }
    mockAPIResponses(apiGateway.apiSauce.axiosInstance, true, simulatedError)
    useCase = new UpdateKnowledgebaseUseCase(apiGateway, repo)

    let state = store.getState()
  
    expect(state.kbState.kb.results.length).toBe(1)
    expect(state.kbState.kb.results[0].id).toBe(1)
    expect(state.kbState.kb.results[0].title).toBe(beforeData.title)
    expect(state.kbState.kb.results[0].description).toBe(beforeData.description)
    expect(state.kbState.kb.results[0].isPublic).toBe(beforeData.isPublic)

    await useCase.execute(afterData, 1)
    state = store.getState()
    expect(state.kbState.kb.results.length).toBe(1)
    expect(state.kbState.kb.results[0].id).toBe(1)
    expect(state.kbState.kb.results[0].title).toBe(beforeData.title)
    expect(state.kbState.kb.results[0].description).toBe(beforeData.description)
    expect(state.kbState.kb.results[0].isPublic).toBe(beforeData.isPublic)
    expect(state.fromKBState.kbErrors.title).toStrictEqual([simulatedError.title])
  })

  test('execute', async () => {
    mockAPIResponses(apiGateway.apiSauce.axiosInstance, false, afterData)
    useCase = new UpdateKnowledgebaseUseCase(apiGateway, repo)

    let state = store.getState()

    expect(state.kbState.kb.results.length).toBe(1)
    expect(state.kbState.kb.results[0].id).toBe(1)
    expect(state.kbState.kb.results[0].title).toBe(beforeData.title)
    expect(state.kbState.kb.results[0].description).toBe(beforeData.description)
    expect(state.kbState.kb.results[0].isPublic).toBe(beforeData.isPublic)

    await useCase.execute(afterData, 1)
    state = store.getState()

    expect(state.kbState.kb.results.length).toBe(1)
    expect(state.kbState.kb.results[0].id).toBe(1)
    expect(state.kbState.kb.results[0].title).toBe(afterData.title)
    expect(state.kbState.kb.results[0].description).toBe(afterData.description)
    expect(state.kbState.kb.results[0].isPublic).toBe(afterData.isPublic)

  })
})
