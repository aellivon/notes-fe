import AuthRepository from '../../../../data/gateways/api/services/auth.repositories'
import KnowledgebaseApiGateway from '../../../../data/gateways/api/services/knowledgebase.gateway'
import KnowledgebaseRepository from '../../../../data/gateways/api/services/knowledgebase.repositories'
import ListKnowledgeBaseUseCase from '../../../../domain/usecases/knowledgebase/listKnowledgebase.usecase'
import LogOutCase from '../../../../domain/usecases/logout/logout.case'


interface Params {
  pageNumber?: number
  url?: string | null,
}

export default class DashboardController {
  private readonly logOutUseCase: LogOutCase
  private readonly listKnowledgebaseUseCase: ListKnowledgeBaseUseCase
  constructor() {
    this.logOutUseCase = new LogOutCase(new AuthRepository())
    this.listKnowledgebaseUseCase = new ListKnowledgeBaseUseCase(new KnowledgebaseApiGateway(), new KnowledgebaseRepository())
  }

  async listKnowledgeBase({pageNumber = 1, url = null}: Params): Promise<any> {
    const result = await this.listKnowledgebaseUseCase.execute({ pageNumber, url })
    return result
  }

  async logout(): Promise<any> {
    const result = await this.logOutUseCase.execute()
    return result
  }

}