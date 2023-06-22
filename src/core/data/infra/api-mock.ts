import MockAdapter from 'axios-mock-adapter'
import { USER_URL, LOGIN_URL, USER_DETAIL_URL, GROUP_URL, REFRESH_URL, KNOWLEDGEBASE_URL, KNOWLEDGEBASE_ALL_URL, KNOWLEDGEBASE_DETAIL_URL } from '../gateways/api/constants'
import UserProfileAuthEntity from '../../domain/entities/users/auth/user-profile-auth.entity'
import UserAuthEntity from '../../domain/entities/users/auth/user-tokens.entity'
import { IFormUserProfileFields, IFormUserProfileErrors } from '../../domain/entities/formModels/user-profile-form.entity'
import { IRefreshResponseModel } from '../gateways/api/api.types'
import { IFormKnowledgebaseErrors, IFormKnowledgebaseFields } from '../../domain/entities/formModels/knowledgebase-form.entity'


export const mockAPIResponses = (
  axiosInstance: any, testError: boolean = false, baseDataRes: any = {}
): void => {
    const mock = new MockAdapter(axiosInstance)

    if (testError) {
      mock.onPost(USER_URL).reply(400, getOnCreateWithErrorResponse(baseDataRes))
      mock.onPatch(USER_DETAIL_URL(2)).reply(400, getUserPatchErrorResponse(baseDataRes))
      mock.onPost(REFRESH_URL).reply(401, getRefreshTokenErrorResponse())

      // KB
      mock.onPost(KNOWLEDGEBASE_URL).reply(400, getKnowledgeBaseErrorResponse(baseDataRes))
      mock.onPatch(KNOWLEDGEBASE_DETAIL_URL(1)).reply(400, getKnowledgbasePatchErrorResponse(baseDataRes))
    } else {
      mock.onPost(LOGIN_URL).reply(200, getLoginResponse())

      // Users
      mock.onPost(USER_URL).reply(201, getOnCreateResponse(baseDataRes))
      mock.onGet(USER_URL).reply(200, getUserListResponse())
      mock.onPatch(USER_DETAIL_URL(2)).reply(200, getUserPatchResponse(baseDataRes))
      mock.onDelete(USER_DETAIL_URL(2)).reply(204, {})

      // Groups
      mock.onGet(GROUP_URL).reply(200, getGroupListResponse())

      // REFRESH
      mock.onPost(REFRESH_URL).reply(200, getRefreshTokenSuccessResponse(baseDataRes))

      // KB
      mock.onGet(KNOWLEDGEBASE_URL).reply(200, getMyKnowledgeBaseListSuccessResponse())
      mock.onGet(KNOWLEDGEBASE_ALL_URL).reply(200, getKnowledgeBaseListSuccessResponse())
      mock.onPost(KNOWLEDGEBASE_URL).reply(201, getKnowledgebaseCreateSuccessResponse(baseDataRes))
      mock.onDelete(KNOWLEDGEBASE_DETAIL_URL(1)).reply(204, {})
      mock.onPatch(KNOWLEDGEBASE_DETAIL_URL(1)).reply(200, getKnowledgebasePatchSuccessResponse(baseDataRes))
    }
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

const getOnCreateResponse = (data: IFormUserProfileFields) => {
  return {
    "id": 2,
    "first_name": data.firstName,
    "last_name": data.lastName,
    "email": data.email,
    "furigana_lname": "",
    "furigana_fname": "",
    "position": "",
    "avatar_url": "http://localhost:8000/media/profile_pictures/f890f801-952.png",
    "date_joined": data.dateJoined,
    "display_name": "Doe Jane"
  }
}

const getOnCreateWithErrorResponse = (data: IFormUserProfileErrors) => {
  console.log(data)
  return {
    "email": [
      data.email
    ]
  }
}

const getUserListResponse = () => {
  return {
    "next": "http://localhost:8000/api/user/user/?page=2",
    "previous": null,
    "count": 2,
    "total_pages": 1,
    "results": [
        {
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
        },
    ],
    "current_page_number": 1
  }
}

const getUserPatchResponse = (data: IFormUserProfileFields) => {
  return {
    "id": 2,
    "first_name": data.firstName,
    "last_name": data.lastName,
    "email": data.email,
    "furigana_lname": "",
    "furigana_fname": "",
    "position": "",
    "avatar_url": "http://localhost:8000/media/profile_pictures/876ccfbd-96b.png",
    "date_joined": data.dateJoined,
    "display_name": "Doe Jaine"
  }
}

const getUserPatchErrorResponse = (data: IFormUserProfileFields) => {
  return {
    "email": [
        data.email
    ]
  }
}

const getGroupListResponse = () => {
  return {
    "next": null,
    "previous": null,
    "count": 1,
    "total_pages": 1,
    "results": [
        {
            "id": 1,
            "name": "User Manager"
        }
    ],
    "current_page_number": 1
  }
}

const getRefreshTokenErrorResponse = () => {
  return {
    "detail": "Token is invalid or expired",
    "code": "token_not_valid"
  }
}

const getRefreshTokenSuccessResponse = (data: IRefreshResponseModel) => {
  return {
    "access": data.access,
    "refresh": data.refresh,
    "access_token_expiration": "2022-06-22T03:34:22.492909Z"
  }
}

const getKnowledgeBaseErrorResponse = (data: IFormKnowledgebaseErrors) => {
  return {
    "title": [
        data.title
    ]
  }
}

const getKnowledgebaseCreateSuccessResponse = (data: IFormKnowledgebaseFields) => {
  return {
    "id": 2,
    "title": data.title,
    "description": data.description,
    "is_public": data.isPublic,
    "owner": 1
  }
}

const getMyKnowledgeBaseListSuccessResponse = () => {
  return {
    "next": null,
    "previous": null,
    "count": 1,
    "total_pages": 1,
    "results": [
        {
            "id": 1,
            "title": "Title",
            "description": "Desc",
            "is_public": false,
            "owner": 1
        }
    ],
    "current_page_number": 1
  }
}

const getKnowledgeBaseListSuccessResponse = () => {
  return {
    "next": null,
    "previous": null,
    "count": 1,
    "total_pages": 1,
    "results": [
        {
            "id": 6,
            "title": "Title",
            "description": "Desc",
            "is_public": true,
            "owner": 1
        }
    ],
    "current_page_number": 1
  }
}


const getKnowledgebasePatchSuccessResponse = (data: IFormKnowledgebaseFields) => {
  return {
    "id": 1,
    "title": data.title,
    "description": data.description,
    "is_public": data.isPublic,
    "owner": 1
  }
}

const getKnowledgbasePatchErrorResponse = (data: IFormKnowledgebaseErrors) => {
  console.log(data)
  return {
    "title": [
        data.title
      ]
  }
}
