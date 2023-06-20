import { setNotificationMessage } from '../../../../presentation/presenters/store/reducers/appState.reducer'
import { store } from '../../../../presentation/presenters/store/store'
import KnowledgebaseApiGateway from '../../../../data/gateways/api/services/knowledgebase.gateway'
import KnowledgebaseRepository from '../../../../data/gateways/api/services/knowledgebase.repositories'

export default class DeleteKnowledgebaseUseCase {
  constructor (
    private readonly dataGateway: KnowledgebaseApiGateway,
    private readonly knowledgebase: KnowledgebaseRepository,
  ) {
  }
  async execute (noteId: number): Promise<any> {
    try {
      await this.dataGateway.deleteKnowledgebase(noteId)
      this.knowledgebase.deleteKnowledgebase(noteId)
      store.dispatch(setNotificationMessage('Successfully Deleted Note'))
    } catch (error: any) {
      this.knowledgebase.setKnowledgebaseFormErrors(this.dataGateway.mapKnowledgeBaseFormError(error))
      console.log({ error })
    }
  }
}
