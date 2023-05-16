
import UserApiGateway from '../../../data/gateways/api/services/user.gateway'
import { PagedUserListEntity } from '../../entities/users/user.entity'

interface Params {
  pageNumber?: number
  url?: string | null,
  queryString?: string
  department?: string
  type?: string
  status?: string
}

export default class ListUsersUseCase {
  constructor (
    private readonly userGateway: UserApiGateway,
  ) {
  }
  async execute ({pageNumber = 1, url = null, queryString = "", department = "*", type = "*", status = "active"}: Params): Promise<any> {
    const response = await this.userGateway.listUsers({pageNumber, url, queryString, department, type, status})
    try {
      const userList = new PagedUserListEntity()
      userList.setFromApiModel(response)

      return {
        'data': userList.getCurrentValues(),
        'success': true
      }
    } catch (error) {
      console.log({ error })
      return {
        'data': new PagedUserListEntity().getCurrentValues(),
        'success': false
      }
    }
  }
}
