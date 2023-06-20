import { setNotificationMessage } from '../../../../presentation/presenters/store/reducers/appState.reducer'
import { store } from '../../../../presentation/presenters/store/store'
import KnowledgebaseApiGateway from '../../../../data/gateways/api/services/knowledgebase.gateway'
import KnowledgebaseRepository from '../../../../data/gateways/api/services/knowledgebase.repositories'
import { IFormKnowledgebaseFields } from '../../../entities/formModels/knowledgebase-form.entity'

export default class UpdateKnowledgebaseUseCase {
  constructor (
    private readonly dataGateway: KnowledgebaseApiGateway,
    private readonly knowledgebase: KnowledgebaseRepository,
  ) {
  }
  async execute (form: IFormKnowledgebaseFields, noteId: number): Promise<any> {
    try {
      const res = await this.dataGateway.updateKnowledgebase(form, noteId)
      const updatedNote = this.dataGateway.mapSingleKBFromResponse(res)
      this.knowledgebase.updateKnowledgebase(updatedNote)
      store.dispatch(setNotificationMessage('Successfully Updated Note'))
    } catch (error: any) {
      this.knowledgebase.setKnowledgebaseFormErrors(this.dataGateway.mapKnowledgeBaseFormError(error))
      console.log({ error })
    }
  }
}
