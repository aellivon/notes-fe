import {
    IRefreshResponseModel,
} from '../api.types'
import { transformTokenResponse } from './mappers/user.auth.mapper';
import { IAuthenticationTokens } from '../../../../domain/entities/users/auth/user-tokens.entity';

import { Api } from '../../../infra/api.base';


export interface IRefreshFormDataModel {
    refresh: string;
}

export default class RefreshAPIGateway extends Api {
    async refresh (form: IRefreshFormDataModel): Promise<IRefreshResponseModel> {
        return this.post<IRefreshResponseModel>('/user/auth/token/refresh/', form)
    }
    
    getTokensFromResponse(response: IRefreshResponseModel): IAuthenticationTokens {
        return transformTokenResponse(response)
    }
}
