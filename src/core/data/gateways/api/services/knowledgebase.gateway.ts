import {
    IKnowledgebaseModel,
    IListKnowledgebaseModel,
} from '../api.types'
import { Api } from '../../../infra/api'
import { setPagedDataBaseAttributes } from './mappers/page.mapper'
import KnowledgebaseEntity, { IKnowledgeBase, PagedKnowledgebaseEntity } from '../../../../domain/entities/knowledgebase/kb.entity'
import { mapKBAttributes } from './mappers/kb.mappers'
import { IFormKnowledgebaseErrors, IFormKnowledgebaseFields } from '../../../../domain/entities/formModels/knowledgebase-form.entity'
import { mapKnowledgebaseFormError } from './mappers/knowledgebaseFormError'
import { KNOWLEDGEBASE_URL } from '../constants'

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

    async updateKnowledgebase(form: IFormKnowledgebaseFields, id: number): Promise<IKnowledgebaseModel> {
        let params: any = {
            title: form.title,
            description: form.description,
            is_public: form.isPublic,
        }
        return await this.patch<IKnowledgebaseModel>(`knowledgebase/knowledgebase/${id}/`, params)
    }

    async createKnowledgebase(form: IFormKnowledgebaseFields): Promise<IKnowledgebaseModel> {
        let params: any = {
            title: form.title,
            description: form.description,
            is_public: form.isPublic,
        }
        return await this.post<IKnowledgebaseModel>(KNOWLEDGEBASE_URL, params)
    }

    async deleteKnowledgebase(id: number): Promise<IKnowledgebaseModel> {
        return await this.delete<IKnowledgebaseModel>(`knowledgebase/knowledgebase/${id}/`)
    }

    mapKnowledgeBaseFormError(error: IFormKnowledgebaseErrors): IFormKnowledgebaseErrors {
        return mapKnowledgebaseFormError(error)
    }

    async listPublicKnowledgebase({ pageNumber = 1, url = null}: Params): Promise<IListKnowledgebaseModel> {
        if (url !== null && url !== undefined) {
            return this.get<IListKnowledgebaseModel>(url, {})
        }
        let params = {
            page: pageNumber,
        }
        return this.get<IListKnowledgebaseModel>('/knowledgebase/knowledgebase/all', { ...params })
    }

    async listMyKnowledgebase({ pageNumber = 1, url = null}: Params): Promise<IListKnowledgebaseModel> {
        if (url !== null && url !== undefined) {
            return this.get<IListKnowledgebaseModel>(url, {})
        }
        let params = {
            page: pageNumber,
        }
        return this.get<IListKnowledgebaseModel>(KNOWLEDGEBASE_URL, { ...params })
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