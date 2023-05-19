import {
    IListUserModel
} from '../api.types'
import { Api } from '../../../infra/api'


interface Params {
    pageNumber?: number
    url?: string | null,
    queryString?: string
    department?: string
    type?: string
    status?: string
}

export default class UserApiGateway extends Api {

    async listUsers ({pageNumber = 1, url = null, queryString = "", department = "*", type = "*", status = "active"}: Params): Promise<IListUserModel> {
        if(url !== null) {
            return this.get<IListUserModel>(url, {})
        }
        let params = {
            page: pageNumber,
            search: queryString,
            division: department,
            type: type,
            status: status
        }
        return this.get<IListUserModel>('/user', {...params})
    }
}
