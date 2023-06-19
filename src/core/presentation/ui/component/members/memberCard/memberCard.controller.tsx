import UserApiGateway from "../../../../../data/gateways/api/services/user.gateway";
import UsersRepository from "../../../../../data/gateways/api/services/users.repositories";
import { IFormUserProfileFields } from "../../../../../domain/entities/formModels/user-profile-form.entity";
import CreateUserUseCase from "../../../../../domain/usecases/users/createUser/createUser.usecase";
import DeleteUserUseCase from "../../../../../domain/usecases/users/deleteUser/deleteUser.usecase";
import UpdateUserUseCase from "../../../../../domain/usecases/users/updateUser/updateUser.usecase";

export default class memberCardController {
  private readonly updateUserUseCase: UpdateUserUseCase
  private readonly createUserUseCase: CreateUserUseCase
  private readonly deleteUserUseCase: DeleteUserUseCase
  private readonly userRepository: UsersRepository

  constructor () {
    this.updateUserUseCase = new UpdateUserUseCase(new UserApiGateway(), new UsersRepository())
    this.createUserUseCase = new CreateUserUseCase(new UserApiGateway(), new UsersRepository())
    this.deleteUserUseCase = new DeleteUserUseCase(new UserApiGateway(), new UsersRepository())
    this.userRepository = new UsersRepository()
  }

  async updateProfile (form: IFormUserProfileFields, userId: number): Promise<any> {
    this.updateUserUseCase.execute(form, userId)
  }

  async createProfile (form: IFormUserProfileFields): Promise<any> {
    this.createUserUseCase.execute(form)
  }

  async deleteProfile (userId: number): Promise<any> {
    this.deleteUserUseCase.execute(userId)
  }

  resetUserFormErrors () {
    this.userRepository.resetUserFormErrors()
  }

}
