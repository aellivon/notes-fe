import { 
    IGroupBaseModel,
} from '../../api.types'


export const setGroupAttributes = (initialModel: IGroupBaseModel | any, data: any = {}) => {
    return {
        ...data,
        id: initialModel.id,
        name: initialModel.name,
    }
}
