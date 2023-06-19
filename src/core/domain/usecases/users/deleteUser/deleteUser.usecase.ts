import { toast } from 'react-toastify'
import { IUserGateway } from '../../../../data/gateways/api/services/user.gateway'
import UsersRepository from '../../../../data/gateways/api/services/users.repositories'
import { IFormUserProfileFields } from '../../../entities/formModels/user-profile-form.entity'
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
      this.usersRepository.updateUser(updatedUser)
      store.dispatch(setNotificationMessage('Successfully Updated Member'))
    } catch (error: any) {
      this.usersRepository.setUserFormErrors(this.dataGateway.mapUserProfileFormError(error))
      // history.apRe
      // toast.error('Error in updating member')
      console.log({ error })
    }
  }
}
