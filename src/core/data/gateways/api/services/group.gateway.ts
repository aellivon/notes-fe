import {
    IListGroupModel
} from '../api.types'
import { Api } from '../../../infra/api'


interface Params {
    pageNumber?: number
}

export default class GroupApiGateway extends Api {
    async listGroups ({pageNumber = 1}: Params): Promise<IListGroupModel> {
        let params = {
            page: pageNumber
        }
        return this.get<IListGroupModel>('/user/division', {...params})
    }
}
