import UserApiGateway from "../../../../../data/gateways/api/services/user.gateway";
import UsersRepository from "../../../../../data/gateways/api/services/users.repositories";
import { IFormUserProfileFields } from "../../../../../domain/entities/formModels/user-profile-form.entity";
import UpdateUserUseCase from "../../../../../domain/usecases/users/updateUser/updateUser.usecase";

export default class memberCardController {
  private readonly updateUserUseCase: UpdateUserUseCase
  private readonly userRepository: UsersRepository

  constructor () {
    this.updateUserUseCase = new UpdateUserUseCase(new UserApiGateway(), new UsersRepository())
    this.userRepository = new UsersRepository()
  }

  async updateProfile (form: IFormUserProfileFields, userId: number): Promise<any> {
    this.updateUserUseCase.execute(form, userId)
  }

  resetUserFormErrors () {
    this.userRepository.resetUserFormErrors()
  }

}
