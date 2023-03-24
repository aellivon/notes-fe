import { PagedGroupBaseEntity } from '../../domain/groups/group-base.entity'
import GroupApiGateway from '../../services/api/gateways/group.gateway'


interface Params {
  pageNumber?: number
}

export default class ListGroupUseCase {
  constructor (
    private readonly groupGateway: GroupApiGateway,
  ) {
  }
  async execute ({pageNumber = 1}: Params): Promise<any> {
    const response = await this.groupGateway.listGroups({pageNumber})
    try {
      const groupList = new PagedGroupBaseEntity()
      groupList.setFromApiModel(response)

      return {
        'data': groupList.getCurrentValues(),
        'success': true
      }
    } catch (error) {
      console.log({ error })
      return {
        'data': new PagedGroupBaseEntity().getCurrentValues(),
        'success': false
      }
    }
  }
}
