import { setNotificationMessage } from '../../../../presentation/presenters/store/reducers/appState.reducer'
import { store } from '../../../../presentation/presenters/store/store'
import KnowledgebaseApiGateway from '../../../../data/gateways/api/services/knowledgebase.gateway'
import KnowledgebaseRepository from '../../../../data/gateways/api/services/knowledgebase.repositories'
import ListMyKnowledgeBaseUseCase from '../listMyKnowledgebase.usecase'
import { IFormKnowledgebaseFields } from '../../../entities/formModels/knowledgebase-form.entity'

export default class CreateKnowledgebaseUseCase {
  constructor (
    private readonly dataGateway: KnowledgebaseApiGateway,
    private readonly knowledgebase: KnowledgebaseRepository,
    private readonly listMyKnowledgebaseUseCase: ListMyKnowledgeBaseUseCase
  ) {
  }
  async execute (form: IFormKnowledgebaseFields): Promise<any> {
    try {
      const res = await this.dataGateway.createKnowledgebase(form)
      this.dataGateway.mapSingleKBFromResponse(res)
      store.dispatch(setNotificationMessage('Successfully Created Note'))
      this.listMyKnowledgebaseUseCase.execute({})
    } catch (error: any) {
      this.knowledgebase.setKnowledgebaseFormErrors(this.dataGateway.mapKnowledgeBaseFormError(error))
      console.log({ error })
    }
  }
}
