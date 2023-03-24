
import UserApiGateway from "../../../core/services/api/gateways/user.gateway"
import GroupApiGateway from "../../../core/services/api/gateways/group.gateway"
import ListUsersUseCase from "../../../core/usecases/users/listUser.usecase"
import ListGroupUseCase from "../../../core/usecases/groups/listGroup.usecase"

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