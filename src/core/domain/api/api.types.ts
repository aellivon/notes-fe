/**
 * Contains all the interfaces for the API responses
 */

// import { IUserProfile } from "../../users/entities/userprofile.type"
// import { UserRole } from "../entities/user-role.entity"

export interface IBaseAPIModel {
  id: number
}

export interface ApiDataResponseModel<T> {
  success: boolean
  code: number
  error: string | null
  response?: T
}

export interface IPagedAPIViewModel<T> {
  range: string
  total_pages: number
  has_previous: boolean
  has_next: boolean
  results: T[]
}

export interface IGroupAPIModel extends IBaseAPIModel {
  name: string
  description?: string
  is_active?: boolean
}


export interface IUserProfileAPIModel extends IBaseAPIModel {
  email?: string
  first_name?: string
  last_name?: string
  display_name?: string
}

export interface ILoginResponseDataModel{
  user: IUserProfileAPIModel
  access_token: string
  refresh_token: string
}

export interface ILoginResponseModel {
  status: string
  data: ILoginResponseDataModel
}

export interface IErrorResponseModel {
  detail?: string
  error?: string
}
