    import {
    IListUserModel
} from '../api.types'
import { Api } from '../../../infra/api'
import UserEntity, { IUserProfile, PagedUserListEntity } from '../../../../domain/entities/users/user.entity'
import { setPagedDataBaseAttributes } from './mappers/page.mapper'
import { setUserAttributes } from './mappers/user.mappers'

interface Params {
    pageNumber?: number
    url?: string | null,
    queryString?: string
    department?: string
    type?: string
    status?: string
}

export interface IUserGateway {
    listUsers: ({pageNumber = 1, url = null, queryString = "", department = "*", type = "*", status = "active"}: Params) => Promise<IListUserModel>
    getUserListFromResponse: (listUserModel: IListUserModel) => PagedUserListEntity
}

export default class UserApiGateway extends Api {

    async listUsers ({pageNumber = 1, url = null, queryString = "", department = "*", type = "*", status = "active"}: Params): Promise<IListUserModel> {
        console.log(pageNumber)
        if(url !== null && url !== undefined) {
            return this.get<IListUserModel>(url, {})
        }
        let params = {
            page: pageNumber,
            search: queryString,
            group: department,
            type: type,
            status: status
        }
        return this.get<IListUserModel>('/user/user', {...params})
    }

    getUserListFromResponse (listUserModel: IListUserModel): PagedUserListEntity {
        let data = setPagedDataBaseAttributes(listUserModel)
        let results: IUserProfile[] = []

        listUserModel.results.forEach(element => {
            const user = new UserEntity()
            user.setEntity(setUserAttributes(element))
            results.push(user.getCurrentValues())
        });

        let pagedUsers = new PagedUserListEntity()
        pagedUsers.setEntity(
            {
                ...data,
                results: results
            }
        )

        return pagedUsers
    }
}