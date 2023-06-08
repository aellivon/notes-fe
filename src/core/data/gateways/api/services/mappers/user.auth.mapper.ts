import { 
    ILoginResponseDataModel, IRefreshResponseModel
} from '../../api.types'


export const setUserAuthAttributes = (initialModel: ILoginResponseDataModel, data: any = {}) => {
    return {
        ...data,
        id: initialModel.user.id,
        email: initialModel.user.email,
        firstName: initialModel.user.first_name,
        displayName: initialModel.user.display_name,
        lastName: initialModel.user.last_name,
        avatarURL: initialModel.user.avatar_url
    }
}

export const transformInitialLoginTokenResponse = (initialModel: ILoginResponseDataModel) => {
    return {
        accessToken: initialModel.access_token,
        refreshToken: initialModel.refresh_token
    }
}

export const transformTokenResponse = (initialModel: IRefreshResponseModel) => {
    return {
        accessToken: initialModel.access,
        refreshToken: initialModel.refresh
    }
}
