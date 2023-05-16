import ListUsersUseCase from "../../../../domain/usecases/users/listUser.usecase"
import ListGroupUseCase from "../../../../domain/usecases/groups/listGroup.usecase"

import UserApiGateway from "../../../../data/gateways/api/services/user.gateway"
import GroupApiGateway from "../../../../data/gateways/api/services/group.gateway"


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
    this.listUsersUseCase = new ListUsersUseCase(new UserApiGateway())
    this.listGroupUseCase = new ListGroupUseCase(new GroupApiGateway())
  }

  async list_users ({pageNumber = 1, url = null, queryString = "", department = "*", type = "*", status = "active"}: Params): Promise<any> {
    const result = await this.listUsersUseCase.execute({pageNumber, url, queryString, department, type, status})
    return result
  }

  async list_departments({pageNumber = 1}): Promise<any> {
    const result = await this.listGroupUseCase.execute({pageNumber})
    return result
  }
}