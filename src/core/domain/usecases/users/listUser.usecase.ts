
import { IUserGateway } from '../../../data/gateways/api/services/user.gateway'
import UsersRepository from '../../../data/gateways/api/services/users.repositories'

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
    private readonly dataGateway: IUserGateway,
    private readonly usersRepository: UsersRepository
  ) {
  }
  async execute ({pageNumber = 1, url = null, queryString = "", department = "*", type = "*", status = "active"}: Params): Promise<any> {
    const response = await this.dataGateway.listUsers({pageNumber, url, queryString, department, type, status})
    try {
      let userList = this.dataGateway.getUserListFromResponse(response)
      this.usersRepository.setUsers(userList)
    } catch (error) {
      console.log({ error })
    }
  }
}
