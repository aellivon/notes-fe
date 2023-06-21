import {
    IRefreshResponseModel,
} from '../api.types'
import { transformTokenResponse } from './mappers/user.auth.mapper';
import { IAuthenticationTokens } from '../../../../domain/entities/users/auth/user-tokens.entity';

import { Api } from '../../../infra/api.base';
import { REFRESH_URL } from '../constants';


export interface IRefreshFormDataModel {
    refresh: string;
}

export default class RefreshAPIGateway extends Api {
    async refresh (form: IRefreshFormDataModel): Promise<IRefreshResponseModel> {
        return this.post<IRefreshResponseModel>(REFRESH_URL, form)
    }
    
    getTokensFromResponse(response: IRefreshResponseModel): IAuthenticationTokens {
        return transformTokenResponse(response)
    }
}
