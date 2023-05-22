import { 
    IUserModel,
} from '../../api.types'
import { setBaseUserAttributes } from './user.base.mapper'


export const setUserAttributes = (initialModel: IUserModel | any, data: any = {}) => {
    return {
        ...setBaseUserAttributes(initialModel, data),
        furiganaFirstName: initialModel.furigana_fname,
        furiganaLastName: initialModel.furigana_lname,
        avatarURL: initialModel.avatar_url,
        position: initialModel.position,
        department: initialModel.department,
    }
}
