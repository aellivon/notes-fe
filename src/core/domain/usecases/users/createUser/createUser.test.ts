import UserApiGateway from "../../../../data/gateways/api/services/user.gateway"
import UsersRepository from "../../../../data/gateways/api/services/users.repositories"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import { IFormUserProfileFields } from "../../../entities/formModels/user-profile-form.entity"
import ListUsersUseCase from "../listUser/listUser.usecase"
import CreateUserUseCase from "./createUser.usecase"


describe('Create User', () => {
  let useCase: CreateUserUseCase
  let user2 = {
    "dateJoined": "2021-03-18T11:47:25",
    "firstName": "Doe",
    "lastName": "Jane",
    "avatarURL": undefined,
    "email": "jane@mail.com"
}

  test('Execute with error', async () => {

    const userAPIGateway = new UserApiGateway()
    const simulatedError = {
      email: "This field may not be blank."
    }
    mockAPIResponses(userAPIGateway.apiSauce.axiosInstance, true, simulatedError)

    useCase = new CreateUserUseCase(
        userAPIGateway, new UsersRepository(),
        new ListUsersUseCase(userAPIGateway, new UsersRepository())
    )

    let state = store.getState()

    expect(state.usersState.users.results.length).toBe(0)

    // Probably need a better way to mock this...
    await useCase.execute(user2)
    state = store.getState()
    expect(state.usersState.users.results.length).toBe(0)
    expect(state.formUserProfileState.userErrors.email).toStrictEqual([simulatedError.email])
  })

  test('execute', async () => {
    const userAPIGateway = new UserApiGateway()
    mockAPIResponses(userAPIGateway.apiSauce.axiosInstance)
    useCase = new CreateUserUseCase(
        userAPIGateway, new UsersRepository(),
        new ListUsersUseCase(userAPIGateway, new UsersRepository())
    )

    let state = store.getState()

    expect(state.usersState.users.results.length).toBe(0)

    await useCase.execute(user2)
    state = store.getState()
    expect(state.usersState.users.results.length).toBe(1)
    expect(state.usersState.users.results[0].id).toBe(2)
    expect(state.usersState.users.results[0].email).toBe(user2.email)
    expect(state.usersState.users.results[0].firstName).toBe(user2.firstName)
    expect(state.usersState.users.results[0].lastName).toBe(user2.lastName)
  })

})
