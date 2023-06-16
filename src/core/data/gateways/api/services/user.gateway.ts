import {
    IListUserModel,
    IUserModel,
    IUserProfileError
} from '../api.types'
import { Api } from '../../../infra/api'
import UserEntity, { IUserProfile, PagedUserListEntity } from '../../../../domain/entities/users/user.entity'
import { setPagedDataBaseAttributes } from './mappers/page.mapper'
import { setUserAttributes } from './mappers/user.mappers'
import { IFormUserProfileFields } from '../../../../domain/entities/formModels/user-profile-form.entity'
import { mapUserFormError } from './mappers/userForms/userFormError'
import { IFormUserProfileErrors } from '../../../../domain/entities/formModels/user-profile-form.entity'

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
    updateUser: (form: IFormUserProfileFields, id: number) => Promise<IUserModel>
    mapUserProfileFormError: (form: IUserProfileError) => IFormUserProfileErrors
}

export default class UserApiGateway extends Api {

    async updateUser(form: IFormUserProfileFields, id: number): Promise<IUserModel> {

        const toBase64 = (file: File) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

        let params: any = {
            first_name: form.firstName,
            last_name: form.lastName,
            furigana_fname: form.furiganaFirstName,
            furigana_lname: form.furiganaLastName,
            position: form.position,
            email: form.email,
            date_joined: form.dateJoined
        }

        if (form.avatarURL !== undefined) {
            let base64AvatarURL = toBase64(form.avatarURL)
            params["avatar_url"] = await base64AvatarURL   
        }
        return await this.patch<IUserModel>(`user/user/${id}/`, params)
    }

    mapUserProfileFormError(error: IUserProfileError): IFormUserProfileErrors {
        return mapUserFormError(error)
    }

    async listUsers ({pageNumber = 1, url = null, queryString = "", department = "*", type = "*", status = "active"}: Params): Promise<IListUserModel> {
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