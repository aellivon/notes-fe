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
      console.log(response)
      let groupList = this.dataGateway.mapGroupEntity(response)
      console.log(groupList, "groupss")
      this.repository.setGroups(groupList)

      return {
        'success': true
      }
    } catch (error) {
      console.log({ error })
      return {
        'success': false
      }
    }
  }
}
