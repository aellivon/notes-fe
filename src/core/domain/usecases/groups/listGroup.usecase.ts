import { IGroupGateway } from '../../../data/gateways/api/services/group.gateway'
import GroupsRepository from '../../../data/gateways/api/services/group.repositories'


interface Params {
  pageNumber?: number
}

export default class ListGroupUseCase {
  constructor (
    private readonly dataGateway: IGroupGateway,
    private readonly repository: GroupsRepository
  ) {
  }
  async execute ({pageNumber = 1}: Params): Promise<any> {
    const response = await this.dataGateway.listGroups({pageNumber})
    try {
      let groupList = this.dataGateway.mapGroupEntity(response)
      this.repository.setGroups(groupList)
    } catch (error) {
      console.log({ error })
    }
  }
}
