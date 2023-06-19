import { IUserGateway } from '../../../../data/gateways/api/services/user.gateway'
import UsersRepository from '../../../../data/gateways/api/services/users.repositories'
import { setNotificationMessage } from '../../../../presentation/presenters/store/reducers/appState.reducer'
import { store } from '../../../../presentation/presenters/store/store'

export default class DeleteUserUseCase {
  constructor (
    private readonly dataGateway: IUserGateway,
    private readonly usersRepository: UsersRepository,
  ) {
  }
  async execute (userID: number): Promise<any> {
    try {
      const res = await this.dataGateway.deleteUser(userID)
      const updatedUser = this.dataGateway.mapSingleUserFromResponse(res)
      this.usersRepository.deleteUser(updatedUser)
      store.dispatch(setNotificationMessage('Successfully Deleted Member'))
    } catch (error: any) {
      this.usersRepository.setUserFormErrors(this.dataGateway.mapUserProfileFormError(error))
      console.log({ error })
    }
  }
}
