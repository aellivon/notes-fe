import KnowledgebaseApiGateway from "../../../../data/gateways/api/services/knowledgebase.gateway"
import KnowledgebaseRepository from "../../../../data/gateways/api/services/knowledgebase.repositories"
import gateway from "../../../../data/gateways/api/services/user.gateway"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import { IFormUserProfileFields } from "../../../entities/formModels/user-profile-form.entity"
import ListMyKnowledgeBaseUseCase from "../listMyKnowlegebaseUseCase/listMyKnowledgebase.usecase"
import CreateKnowledgebaseUseCase from "./createKnowledgebase.usecase"


describe('Create Knowledgbase', () => {
  let gateway: KnowledgebaseApiGateway
  let useCase: CreateKnowledgebaseUseCase
  let repo: KnowledgebaseRepository
  let knowledgebase = {
    "title": "Title",
    "description": "Desc",
    "isPublic": false
  }

  beforeEach(() => {
    gateway = new KnowledgebaseApiGateway()
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
    repo.setKnowledgebase(gateway.getKBListFromResponse(toSet))
  })

  test('Execute with error', async () => {
    const simulatedError = {
      title: "This field is required."
    }
    mockAPIResponses(gateway.apiSauce.axiosInstance, true, simulatedError)

    useCase = new CreateKnowledgebaseUseCase(
        gateway, new KnowledgebaseRepository(),
        new ListMyKnowledgeBaseUseCase(gateway, new KnowledgebaseRepository())
    )

    let state = store.getState()

    expect(state.kbState.kb.results.length).toBe(1)

    await useCase.execute(knowledgebase)
    state = store.getState()
    expect(state.kbState.kb.results.length).toBe(1)
    expect(state.fromKBState.kbErrors.title).toStrictEqual([simulatedError.title])
  })


  test('execute', async () => {
    mockAPIResponses(gateway.apiSauce.axiosInstance, false, knowledgebase)

    useCase = new CreateKnowledgebaseUseCase(
        gateway, new KnowledgebaseRepository(),
        new ListMyKnowledgeBaseUseCase(gateway, new KnowledgebaseRepository())
    )

    let state = store.getState()

    expect(state.kbState.kb.results.length).toBe(1)

    await useCase.execute(knowledgebase)
    state = store.getState()

    expect(state.kbState.kb.results.length).toBe(1)
    expect(state.kbState.kb.results[0].title).toBe(knowledgebase.title)
    expect(state.kbState.kb.results[0].description).toBe(knowledgebase.description)
    expect(state.kbState.kb.results[0].isPublic).toBe(knowledgebase.isPublic)
  })
})
