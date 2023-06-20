import KnowledgebaseRepository from "../../../../../data/gateways/api/services/knowledgebase.repositories";

export default class knowledgebaseModalController {
  private readonly kbRepository: KnowledgebaseRepository

  constructor () {
    this.kbRepository = new KnowledgebaseRepository()
  }

  resetUserFormErrors () {
    this.kbRepository.resetKnowledgebaseFormErrors()
  }
}
