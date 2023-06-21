import UserApiGateway from "../../../../data/gateways/api/services/user.gateway"
import UsersRepository from "../../../../data/gateways/api/services/users.repositories"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import { IFormUserProfileFields } from "../../../entities/formModels/user-profile-form.entity"
import ListUsersUseCase from "../listUser.usecase"
import CreateUserUseCase from "./createUser.usecase"


describe('Create User', () => {
  let useCase: CreateUserUseCase


  beforeEach(() => {

    const userAPIGateway = new UserApiGateway()
    mockAPIResponses(userAPIGateway.apiSauce.axiosInstance)
    useCase = new CreateUserUseCase(
        new UserApiGateway(), new UsersRepository(),
        new ListUsersUseCase(new UserApiGateway(), new UsersRepository())
    )
  })

  test('execute', async () => {
    const state = store.getState()

    expect(state.users.length).toBe(0)

    // Probably need a better way to mock this...
    const user2 = {
        "dateJoined": "2021-03-18T11:47:25",
        "firstName": "Doe",
        "lastName": "Jane",
        "avatarURL": undefined,
        "email": "jane@mail.com"
    }
    await useCase.execute(user2)
    expect(state.users.length).toBe(1)
    expect(state.users[0].id).toBe(2)
    expect(state.users[0].email).toBe(user2.email)
    expect(state.users[0].firstName).toBe(user2.firstName)
    expect(state.users[0].lastName).toBe(user2.lastName)
  })
})
