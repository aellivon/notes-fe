import {
    IListGroupModel
} from '../api.types'
import { Api } from '../../../infra/api'


interface Params {
    pageNumber?: number
}


export interface IGroupGateway {
    listGroups: ({pageNumber = 1}: Params) => Promise<IListGroupModel>
}

export default class GroupApiGateway extends Api implements IGroupGateway {
    async listGroups ({pageNumber = 1}: Params): Promise<IListGroupModel> {
        let params = {
            page: pageNumber
        }
        return this.get<IListGroupModel>('/user/division', {...params})
    }
}
