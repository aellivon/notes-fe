import {
    IRefreshParamModel,
    IRefreshResponseDataModel
} from '../api.types'

import { Api } from '../../../infra/api'

export default class RefreshAPIGateway extends Api {
    async refresh (form: IRefreshParamModel): Promise<IRefreshResponseDataModel> {
        return this.post<IRefreshResponseDataModel>('/user/auth/token/refresh/', form)
    }
}
