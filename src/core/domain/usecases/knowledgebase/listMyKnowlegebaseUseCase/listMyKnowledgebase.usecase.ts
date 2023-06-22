
import KnowledgebaseApiGateway from '../../../../data/gateways/api/services/knowledgebase.gateway'
import KnowledgebaseRepository from '../../../../data/gateways/api/services/knowledgebase.repositories'

interface Params {
  pageNumber?: number
  url?: string | null
}

export default class ListMyKnowledgeBaseUseCase {
  constructor (
    private readonly dataGateway: KnowledgebaseApiGateway,
    private readonly kbRepository: KnowledgebaseRepository
  ) {
  }
  async execute ({pageNumber = 1, url = null}: Params): Promise<any> {
    const response = await this.dataGateway.listMyKnowledgebase({pageNumber, url})
    try {
      let kbList = this.dataGateway.getKBListFromResponse(response)
      this.kbRepository.setKnowledgebase(kbList)
    } catch (error) {
      console.log({ error })
    }
  }
}
