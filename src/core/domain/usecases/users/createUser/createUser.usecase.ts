import { toast } from 'react-toastify'
import { IUserGateway } from '../../../../data/gateways/api/services/user.gateway'
import UsersRepository from '../../../../data/gateways/api/services/users.repositories'
import { IFormUserProfileFields } from '../../../entities/formModels/user-profile-form.entity'
import { setNotificationMessage } from '../../../../presentation/presenters/store/reducers/appState.reducer'
import { store } from '../../../../presentation/presenters/store/store'
import ListUsersUseCase from '../listUser.usecase'

export default class CreateUserUseCase {
  constructor (
    private readonly dataGateway: IUserGateway,
    private readonly usersRepository: UsersRepository,
    // There might be a better place for this? Even if this is a dependncy injection
    // This is a usecase, relying on a usecase
    private readonly listUserUseCase: ListUsersUseCase
  ) {
  }
  async execute (form: IFormUserProfileFields): Promise<any> {
    try {
      const res = await this.dataGateway.createUser(form)
      this.dataGateway.mapSingleUserFromResponse(res)
      store.dispatch(setNotificationMessage('Successfully Created Member'))
      this.listUserUseCase.execute({})
    } catch (error: any) {
      this.usersRepository.setUserFormErrors(this.dataGateway.mapUserProfileFormError(error))
      console.log({ error })
    }
  }
}
