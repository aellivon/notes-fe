import UserApiGateway from "../../../../data/gateways/api/services/user.gateway"
import UsersRepository from "../../../../data/gateways/api/services/users.repositories"
import { mockAPIResponses } from "../../../../data/infra/api-mock"
import { store } from "../../../../presentation/presenters/store/store"
import DeleteUserUseCase from "./deleteUser.usecase"

describe('Delete User', () => {
  let useCase: DeleteUserUseCase
  let userRepo: UsersRepository
  let apiGateway: UserApiGateway
  let beforeUser2 = {
    "dateJoined": "2021-03-18T11:47:25",
    "firstName": "Doe",
    "lastName": "Jane",
    "avatarURL": undefined,
    "email": "jane@mail.com"
}

  beforeEach(() => {
    apiGateway = new UserApiGateway()
    userRepo = new UsersRepository()
    const toSet = {
        "next": "http://localhost:8000/api/user/user/?page=2",
        "previous": null,
        "count": 2,
        "total_pages": 1,
        "results": [
            {
                "id": 2,
                "first_name": beforeUser2.firstName,
                "last_name": beforeUser2.lastName,
                "email": beforeUser2.email,
                "furigana_lname": "",
                "furigana_fname": "",
                "position": "",
                "avatar_url": "http://localhost:8000/media/profile_pictures/f890f801-952.png",
                "date_joined": "2021-03-18T11:47:25+09:00",
                "display_name": "Doe Jane"
            },
        ],
        "current_page_number": 1
    }
    userRepo.setUsers(apiGateway.getUserListFromResponse(toSet))
  })

  test('execute', async () => {
    mockAPIResponses(apiGateway.apiSauce.axiosInstance)
    useCase = new DeleteUserUseCase(apiGateway, userRepo)

    let state = store.getState()

    expect(state.usersState.users.results.length).toBe(1)
    expect(state.usersState.users.results[0].id).toBe(2)
    expect(state.usersState.users.results[0].email).toBe(beforeUser2.email)
    expect(state.usersState.users.results[0].firstName).toBe(beforeUser2.firstName)
    expect(state.usersState.users.results[0].lastName).toBe(beforeUser2.lastName)

    await useCase.execute(2)
    state = store.getState()
    expect(state.usersState.users.results.length).toBe(0)
  })
})
