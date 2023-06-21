import MockAdapter from 'axios-mock-adapter'
import { LIST_USER_URL, LOGIN_URL } from '../gateways/api/constants'
import UserProfileAuthEntity from '../../domain/entities/users/auth/user-profile-auth.entity'
import UserAuthEntity from '../../domain/entities/users/auth/user-tokens.entity'


export const mockAPIResponses = (axiosInstance: any): void => {
    const mock = new MockAdapter(axiosInstance)

    mock.onPost(LOGIN_URL).reply(200, getLoginResponse())
    mock.onPost(LIST_USER_URL).reply(201, getOnCreateResponse())
    mock.onGet(LIST_USER_URL).reply(200, getUserListResponse())
}

const getLoginResponse = () => {
  const user: UserProfileAuthEntity = UserProfileAuthEntity.mock()
  const tokens: UserAuthEntity = UserAuthEntity.mock()
  return {
    "access_token": tokens.accessToken,
    "refresh_token": tokens.refreshToken,
    "user": {
      "id": 1,
      "email": user.email,
      "first_name": user.firstName,
      "last_name": user.lastName,
      "display_name": user.displayName,
      "avatar_url": user.avatarURL
    }
  }
}

const getOnCreateResponse = () => {
  return {
    "id": 2,
    "first_name": "Doe",
    "last_name": "Jane",
    "email": "jane@mail.com",
    "furigana_lname": "",
    "furigana_fname": "",
    "position": "",
    "avatar_url": "http://localhost:8000/media/profile_pictures/f890f801-952.png",
    "date_joined": "2021-03-18T11:47:25+09:00",
    "display_name": "Doe Jane"
  }
}

const getUserListResponse = () => {
  return {
    "next": "http://localhost:8000/api/user/user/?page=2",
    "previous": null,
    "count": 47,
    "total_pages": 7,
    "results": [
        {
            "id": 47,
            "first_name": "Doe",
            "last_name": "Jane",
            "email": "jane@mail.com",
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
}
