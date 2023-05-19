import { ApiResponse, ApisauceInstance, create } from 'apisauce'
import { ApiConfig, API_CONFIG, REFRESH_URL } from './api.config'
import { getGeneralApiProblem } from './api-problem'
import { IErrorResponseModel } from '../gateways/api/api.types'
import { toast } from 'react-toastify'
import { store } from '../../presentation/presenters/store/store'
import RefreshAPIGateway from '../gateways/api/services/refresh.gateway'

import {
  IRefreshParamModel,
  IRefreshResponseDataModel
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
  onHoldRequest: ApiResponse<unknown, unknown> | null

  constructor() {
    this.config = API_CONFIG
    this.apiSauce = create({
      baseURL: this.config.url,
      headers: {
        Accept: 'application/json'
      }
    })

    this.onHoldRequest = null

    const authToken = store.getState().authState.user.accessToken

    if (authToken !== '') {
      this.apiSauce.addRequestTransform(request => {
        request.headers.Authorization = `Bearer ${authToken}`
      })
      this.apiSauce.addResponseTransform(async (response: ApiResponse<unknown, unknown>) => {

        if (response.status && response.status == 401 && this.onHoldRequest === null) {
          let form: IRefreshParamModel = {
            refresh: store.getState().authState.user.refreshToken
          }
          this.onHoldRequest = response
          const res = await this.post<IRefreshResponseDataModel>('/user/auth/token/refresh/', form)
          
        }

        return response
      });
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


  handleAPIResult<TApiResponseModel>(response: ApiResponse<unknown, unknown>): TApiResponseModel {
    const data = response.data as ApiDataResponseModel<TApiResponseModel>
    if (response.status && [200, 201, 202, 203, 204].includes(response.status)) {
      return data as TApiResponseModel
    } else {
      const errorResponseObject = JSON.parse(JSON.stringify(data));
      for (const [key, value] of Object.entries(errorResponseObject)) {
        let errorMessageKey = ''
        if (key !== 'detail'){
          errorMessageKey= `${key} :`
        }
        toast.error(`${errorMessageKey} ${value}`)
      }

      throw new Error('Error')
    }
  }

  handleDataResult<TApiResponseModel>(data: ApiDataResponseModel<TApiResponseModel>): TApiResponseModel {
    return data.response as TApiResponseModel
  }

  parseAPIResultIntoModel<TApiResponseModel>(response: ApiResponse<unknown, unknown>): TApiResponseModel {
    return this.handleAPIResult<TApiResponseModel>(response)
  }

  async delete<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.delete(apiPath, params)
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
  }

  async get<TApiResponseModel>(apiPath: string, params?: any): Promise<TApiResponseModel> {
    const result = await this.apiSauce.get(apiPath, params)
    return this.parseAPIResultIntoModel<TApiResponseModel>(result)
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
