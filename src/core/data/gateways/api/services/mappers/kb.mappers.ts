import { 
    IKnowledgebaseModel,
} from '../../api.types'

export const mapKBAttributes = (initialModel: IKnowledgebaseModel | any, data: any = {}) => {
    return {
        ...data,
        id: initialModel.id,
        description: initialModel.description,
        title: initialModel.title,
        isPublic: initialModel.is_public,
    }
}
