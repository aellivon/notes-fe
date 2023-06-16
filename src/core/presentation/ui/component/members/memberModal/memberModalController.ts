import UsersRepository from "../../../../../data/gateways/api/services/users.repositories";

export default class memberModalController {
  private readonly userRepository: UsersRepository

  constructor () {
    this.userRepository = new UsersRepository()
  }

  resetUserFormErrors () {
    this.userRepository.resetUserFormErrors()
  }
}
