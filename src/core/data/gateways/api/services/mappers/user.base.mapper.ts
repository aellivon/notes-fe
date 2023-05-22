import { 
    IUserModel,
} from '../../api.types'



export const setBaseUserAttributes = (initialModel: IUserModel | any, data: any = {}) => {
    return {
        ...data,
        id: initialModel.id,
        email: initialModel.email,
        firstName: initialModel.first_name,
        avatarURL: initialModel.avatar_url,
        displayName: initialModel.display_name,
        lastName: initialModel.last_name
    }
}
