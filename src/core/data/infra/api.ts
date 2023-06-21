import { ApiResponse } from 'apisauce'
import { Api as baseApi, ApiDataResponseModel } from "./api.base";
import {
  IRefreshParamModel,
} from '../gateways/api/api.types'
import { callRefresh } from '../../domain/usecases/auth/refreshToken.usecase'
import { store } from '../../presentation/presenters/store/store'
import { callLogout } from '../../domain/usecases/logout/logout.case'

export class Api extends baseApi {
  // Api class that has refresh token and logout
  async handleAPIResult<TApiResponseModel>(response: ApiResponse<unknown, unknown>): Promise<TApiResponseModel> {
    const data = response.data as ApiDataResponseModel<TApiResponseModel>
    if (response.status && [200, 201, 202, 203, 204].includes(response.status)) {
      return data as TApiResponseModel
    } else if (response.status === 401) {
        if (response.status && response.status === 401 && this.singleRequest === false) {
          if (this.onHoldRequest === null) {
              let form: IRefreshParamModel = {
                refresh: store.getState().authState.tokens.refreshToken
              }
              // Maybe setting it on axios is better?
              this.onHoldRequest = response
              await callRefresh(form)
              const updatedStore = store.getState()
              if (updatedStore.authState.tokens.accessToken !== "" && this.onHoldRequest.config !== undefined) {
                response = await this.apiSauce.any(this.onHoldRequest.config)
              } else {
                callLogout()
              }
            } else {
              callLogout()
            }
        }
        return response.data as TApiResponseModel
    } else {
      const errorResponseObject = JSON.parse(JSON.stringify(data));
      throw errorResponseObject
    }
  }
}
