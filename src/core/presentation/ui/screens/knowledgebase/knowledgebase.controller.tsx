import KnowledgebaseApiGateway from '../../../../data/gateways/api/services/knowledgebase.gateway'
import KnowledgebaseRepository from '../../../../data/gateways/api/services/knowledgebase.repositories'
import { IFormKnowledgebaseFields } from '../../../../domain/entities/formModels/knowledgebase-form.entity'
import CreateKnowledgebaseUseCase from '../../../../domain/usecases/knowledgebase/createKnowledgebase/createKnowledgebase.usecase'
import ListKnowledgeBaseUseCase from '../../../../domain/usecases/knowledgebase/listKnowledgebase/listKnowledgebase.usecase'
import ListMyKnowledgeBaseUseCase from '../../../../domain/usecases/knowledgebase/listMyKnowlegebaseUseCase/listMyKnowledgebase.usecase'


interface Params {
  pageNumber?: number
  url?: string | null,
}

export default class KnowledgebaseController {
  private readonly listKnowledgebaseUseCase: ListKnowledgeBaseUseCase
  private readonly listMyKnowledgebaseUseCase: ListMyKnowledgeBaseUseCase
  private readonly createKnowledgebaseUseCase: CreateKnowledgebaseUseCase

  constructor() {
    this.listKnowledgebaseUseCase = new ListKnowledgeBaseUseCase(new KnowledgebaseApiGateway(), new KnowledgebaseRepository())
    this.listMyKnowledgebaseUseCase = new ListMyKnowledgeBaseUseCase(new KnowledgebaseApiGateway(), new KnowledgebaseRepository())
    this.createKnowledgebaseUseCase = new CreateKnowledgebaseUseCase(
      new KnowledgebaseApiGateway(), new KnowledgebaseRepository(), new ListMyKnowledgeBaseUseCase(new KnowledgebaseApiGateway(), new KnowledgebaseRepository())
    )

  }

  async listKnowledgeBase({ pageNumber = 1, url = null }: Params): Promise<any> {
    const result = await this.listKnowledgebaseUseCase.execute({ pageNumber, url })
    return result
  }

  async listMyKnowledgeBase({ pageNumber = 1, url = null }: Params): Promise<any> {
    const result = await this.listMyKnowledgebaseUseCase.execute({ pageNumber, url })
    return result
  }

  async createKnowledgebase(form: IFormKnowledgebaseFields): Promise<any> {
    await this.createKnowledgebaseUseCase.execute(form)
  }

}