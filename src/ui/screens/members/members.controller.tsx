
import UserApiGateway from "../../../core/services/api/gateways/user.gateway"
import ListUsersUseCase from "../../../core/usecases/users/listUser.usecase"

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

  constructor () {
    this.listUsersUseCase = new ListUsersUseCase(new UserApiGateway())
  }

  async list_users ({pageNumber = 1, url = null, queryString = "", department = "*", type = "*", status = "active"}: Params): Promise<any> {
    const result = await this.listUsersUseCase.execute({pageNumber, url, queryString, department, type, status})
    return result
  }
}