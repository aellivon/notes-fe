import {
    IKnowledgebaseModel,
    IListKnowledgebaseModel,
} from '../api.types'
import { Api } from '../../../infra/api'
import { setPagedDataBaseAttributes } from './mappers/page.mapper'
import KnowledgebaseEntity, { IKnowledgeBase, PagedKnowledgebaseEntity } from '../../../../domain/entities/knowledgebase/kb.entity'
import { mapKBAttributes } from './mappers/kb.mappers'

interface Params {
    pageNumber?: number
    url?: string | null,
}

export interface IKnowledgebaseGateway {
    listPublicKnowledgebase: ({ pageNumber = 1, url=null }: Params) => Promise<IListKnowledgebaseModel>
    getKBListFromResponse: (listUserModel: IListKnowledgebaseModel) => PagedKnowledgebaseEntity
    mapSingleKBFromResponse: (rawUser: IKnowledgebaseModel) => IKnowledgebaseModel
}

export default class KnowledgebaseApiGateway extends Api {

    async listPublicKnowledgebase({ pageNumber = 1, url = null}: Params): Promise<IListKnowledgebaseModel> {
        if (url !== null && url !== undefined) {
            return this.get<IListKnowledgebaseModel>(url, {})
        }
        let params = {
            page: pageNumber,
        }
        return this.get<IListKnowledgebaseModel>('/knowledgebase/knowledgebase/all', { ...params })
    }

    getKBListFromResponse(listKnowledgebaseModel: IListKnowledgebaseModel): PagedKnowledgebaseEntity {
        let data = setPagedDataBaseAttributes(listKnowledgebaseModel)
        let results: IKnowledgeBase[] = []
        listKnowledgebaseModel.results.forEach(element => {
            const kb = new KnowledgebaseEntity()
            kb.setEntity(mapKBAttributes(element))
            results.push(kb.getCurrentValues())
        });

        let pagedUsers = new PagedKnowledgebaseEntity()
        pagedUsers.setEntity(
            {
                ...data,
                results: results
            }
        )
        return pagedUsers
    }

    mapSingleKBFromResponse(rawKB: IKnowledgebaseModel): IKnowledgeBase {
        const user = new KnowledgebaseEntity()
        user.setEntity(mapKBAttributes(rawKB))
        return user.getCurrentValues()
    }
}