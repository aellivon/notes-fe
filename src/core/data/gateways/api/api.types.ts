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
  previous: boolean
  next: boolean
  count: number
  current_page_number: number
  total_pages: number
  results: T[]
}

export interface IGroupBaseModel extends IBaseAPIModel {
  name: string
  is_active?: boolean
}

export interface IUserModel extends IBaseAPIModel {
  email: string
  first_name: string
  last_name: string
  display_name: string
  department?: string
  furigana_fname?: string
  furigana_lname?: string
  position?: string
  avatar_url: string
  date_joined?: string
  is_active?: boolean
}

export interface IListUserModel extends IPagedAPIViewModel<IUserModel> {}

export interface IListGroupModel extends IPagedAPIViewModel<IGroupBaseModel> {}

export interface ILoginResponseDataModel{
  user: IUserModel
  access_token: string
  refresh_token: string
}

export interface IErrorResponseModel {
  detail?: string
  error?: string
}

export interface IRefreshResponseModel {
  access: string
  refresh: string
}

export interface IRefreshParamModel {
  refresh: string
}

export interface IRefreshResponseDataModel {
  access: string
  refresh: string
  access_token_expiration: string
}

export interface IUserProfileError {
  email?: string,
  non_field_errors?: string,
  avatar_url?: string
  first_name?: string
  last_name?: string
  furigana_first_name?: string
  furigana_last_name?: string
  position?: string
  date_joined?: string
}

export interface WrappedIUserProfileError {
  error: IUserProfileError
}
