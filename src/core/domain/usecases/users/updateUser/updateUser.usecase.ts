import { toast } from 'react-toastify'
import { IUserGateway } from '../../../../data/gateways/api/services/user.gateway'
import UsersRepository from '../../../../data/gateways/api/services/users.repositories'
import { IFormUserProfileFields } from '../../../entities/formModels/user-profile-form.entity'
import { setNotificationMessage } from '../../../../presentation/presenters/store/reducers/appState.reducer'
import { store } from '../../../../presentation/presenters/store/store'

export default class UpdateUserUseCase {
  constructor (
    private readonly dataGateway: IUserGateway,
    private readonly usersRepository: UsersRepository,
  ) {
  }
  async execute (form: IFormUserProfileFields, userID: number): Promise<any> {
    try {
      const res = await this.dataGateway.updateUser(form, userID)
      const updatedUser = this.dataGateway.mapSingleUserFromResponse(res)
      this.usersRepository.updateUser(updatedUser)
      store.dispatch(setNotificationMessage('Successfully Updated Member'))
    } catch (error: any) {
      this.usersRepository.setUserFormErrors(this.dataGateway.mapUserProfileFormError(error))
      toast.error('Failed to update member...')
      console.log({ error })
    }
  }
}
