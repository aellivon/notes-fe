import KnowledgebaseApiGateway from "../../../../../data/gateways/api/services/knowledgebase.gateway";
import KnowledgebaseRepository from "../../../../../data/gateways/api/services/knowledgebase.repositories";
import { IFormKnowledgebaseFields } from "../../../../../domain/entities/formModels/knowledgebase-form.entity";
import DeleteKnowledgebaseUseCase from "../../../../../domain/usecases/knowledgebase/deleteKnowledgebase/deleteKnowledgebase.usecase";
import UpdateKnowledgebaseUseCase from "../../../../../domain/usecases/knowledgebase/updateKnowledgebase/updateKnowledgebase.usecase";

export default class knowledgebaseCardController {
  private readonly updateKnowledgebaseUseCase: UpdateKnowledgebaseUseCase
  private readonly deleteKnowledgebaseUseCase: DeleteKnowledgebaseUseCase

  constructor () {
    this.updateKnowledgebaseUseCase = new UpdateKnowledgebaseUseCase(new KnowledgebaseApiGateway(), new KnowledgebaseRepository())
    this.deleteKnowledgebaseUseCase = new DeleteKnowledgebaseUseCase(new KnowledgebaseApiGateway(), new KnowledgebaseRepository())
  }

  async updateKnowledgebase (form: IFormKnowledgebaseFields, userId: number): Promise<any> {
    this.updateKnowledgebaseUseCase.execute(form, userId)
  }

  async deleteKnowledgebase (userId: number): Promise<any> {
    this.deleteKnowledgebaseUseCase.execute(userId)
  }

}
