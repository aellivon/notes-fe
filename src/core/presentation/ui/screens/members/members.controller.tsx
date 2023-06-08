import ListUsersUseCase from "../../../../domain/usecases/users/listUser.usecase"
import ListGroupUseCase from "../../../../domain/usecases/groups/listGroup.usecase"

import UserApiGateway from "../../../../data/gateways/api/services/user.gateway"
import UsersRepository from "../../../../data/gateways/api/services/users.repositories"
import GroupApiGateway from "../../../../data/gateways/api/services/group.gateway"
import GroupsRepository from "../../../../data/gateways/api/services/group.repositories"


interface Params {
  pageNumber?: number
  url?: string | null,
  queryString?: string
  department?: string
  type?: string
  status?: string
}

export default class MemberController {
  private readonly listUsersUseCase: ListUsersUseCase
  private readonly listGroupUseCase: ListGroupUseCase

  constructor () {
    this.listUsersUseCase = new ListUsersUseCase(new UserApiGateway(), new UsersRepository())
    this.listGroupUseCase = new ListGroupUseCase(new GroupApiGateway(), new GroupsRepository())
  }

  async listUsers ({pageNumber = 1, url = null, queryString = "", department = "*", type = "*", status = "active"}: Params): Promise<any> {
    const result = await this.listUsersUseCase.execute({pageNumber, url, queryString, department, type, status})
    return result
  }

  async listDepartments({pageNumber = 1}): Promise<any> {
    const result = await this.listGroupUseCase.execute({pageNumber})
    return result
  }
}
