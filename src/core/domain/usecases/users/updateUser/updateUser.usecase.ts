import { IUserGateway } from '../../../../data/gateways/api/services/user.gateway'
import UsersRepository from '../../../../data/gateways/api/services/users.repositories'
import { IFormUserProfileFields } from '../../../entities/formModels/user-profile-form.entity'

export default class UpdateUserUseCase {
  constructor (
    private readonly dataGateway: IUserGateway,
    private readonly usersRepository: UsersRepository
  ) {
  }
  async execute (form: IFormUserProfileFields, userID: number): Promise<any> {
    try {
      
      const res = await this.dataGateway.updateUser(form, userID)
      // let userList = this.dataGateway.getUserListFromResponse(response)
      // this.usersRepository.setUsers(userList)
    } catch (error: any) {
      this.usersRepository.setUserFormErrors(this.dataGateway.mapUserProfileFormError(error))
      console.log({ error })
    }
  }
}
