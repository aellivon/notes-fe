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
      await this.dataGateway.deleteUser(userID)
      this.usersRepository.deleteUser(userID)
      store.dispatch(setNotificationMessage('Successfully Deleted Member'))
    } catch (error: any) {  
      store.dispatch(setNotificationMessage('Failed to delete member! \n Please check that it is not your own account...'))
      console.log({ error })
    }
  }
}
