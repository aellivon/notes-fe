import { callRefresh } from '../../domain/usecases/users/refreshToken.usecase'
import { callLogout } from '../../domain/usecases/logout/logout.case'
import { ApiResponse, ApisauceInstance, create } from 'apisauce'
import { ApiConfig, API_CONFIG } from './api.config'
import { getGeneralApiProblem } from './api-problem'
import { IErrorResponseModel } from '../gateways/api/api.types'
import { store } from '../../presentation/presenters/store/store'

import {
  IRefreshParamModel,
} from '../gateways/api/api.types'

export interface IApi {
  apiSauce: ApisauceInstance
  config: ApiConfig
}

export interface ApiDataResponseModel<TApiResponseModel> {
  success: boolean
  code: number
  error: string | null
  response?: TApiResponseModel | IErrorResponseModel
}


export class Api implements IApi {
  apiSauce: ApisauceInstance
  config: ApiConfig
  singleRequest: boolean
  onHoldRequest: ApiResponse<unknown, unknown> | null

  constructor(singleRequest=false) {
    this.singleRequest = singleRequest
    this.config = API_CONFIG
    this.apiSauce = create({
      baseURL: this.config.url,
      headers: {
        Accept: 'application/json'
      }
    })

    this.onHoldRequest = null

    const authToken = store.getState().authState.tokens.accessToken

    if (authToken !== '') {

      this.apiSauce.addRequestTransform(request => {
        const innerAuthToken = store.getState().authState.tokens.accessToken
        request.headers.Authorization = `Bearer ${innerAuthToken}`
      })
      // this.apiSauce.addResponseTransform();
    }
  }

  handleAPIFailure(response: ApiResponse<unknown, unknown>): IErrorResponseModel | null {
    const problemKind = getGeneralApiProblem(response)  
    if (problemKind?.kind === 'cannot-connect' || 'server' || 'timeout') {
    }
    const res = {
      detail: problemKind?.kind,
      error: '400'
    } as IErrorResponseModel
    return res
  }


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
              const refRes = await callRefresh(form)
              if (refRes.success === true && this.onHoldRequest.config !== undefined) {
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

  async parseAPIResultIntoModel<TApiResponseModel>(response: ApiResponse<unknown, unknown>): Promise<TApiResponseModel> {
    return await this.handleAPIResult<TApiResponseModel>(response)
  }

  async delete<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.delete(apiPath, params)
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async get<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.get(apiPath, params)
    return await this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async post<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.post(apiPath, params)
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async upload<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const headers = {
      'Content-Type': 'multipart/form-data'
    }
    const form = new FormData()
    for (var key in params) {
      form.append(key, params[key])
    }
    const result = await this.apiSauce.post(apiPath, form, { headers })
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async put<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.put(apiPath, params)
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async patch<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.patch(apiPath, params)
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async uploadPatch<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const headers = {
      'Content-Type': 'multipart/form-data'
    }
    const form = new FormData()
    for (var key in params) {
      form.append(key, params[key])
    }
    const result = await this.apiSauce.patch(apiPath, form, { headers })
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

}
