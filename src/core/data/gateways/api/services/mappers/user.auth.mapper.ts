import { 
    ILoginResponseDataModel,
} from '../../api.types'



export const setUserAuthAttributes = (initialModel: ILoginResponseDataModel, data: any = {}) => {
    return {
        ...data,
        id: initialModel.user.id,
        email: initialModel.user.email,
        firstName: initialModel.user.first_name,
        displayName: initialModel.user.display_name,
        lastName: initialModel.user.last_name,
        accessToken: initialModel.access_token,
        refreshToken: initialModel.refresh_token,
        avatarURL: initialModel.user.avatar_url
    }
}
