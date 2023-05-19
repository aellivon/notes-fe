import UserBaseEntity, { IBaseUserProfile } from './user-base.entity'

import { IUserModel, IListUserModel, } from '../../../data/gateways/api/api.types'
import PagedListEntity from '../base/base.paged.entity'


export interface IUserProfile extends IBaseUserProfile {
  furiganaLastName?: string
  furiganaFirstName?: string
  avatarURL: string
  position?: string
  department?: string
}

export default class UserEntity extends UserBaseEntity {
  furiganaFirstName?: string = ''
  furiganaLastName?: string = ''
  position?: string = ''
  department?: string = ''

  setFromApiModel(model: IUserModel): void {
    super.setFromApiModel(model)
    this.furiganaFirstName = model.furigana_fname
    this.furiganaLastName = model.furigana_lname
    this.avatarURL = model.avatar_url
    this.position = model.position
    this.department = model.department
  }

  getCurrentValues(): IUserProfile {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      displayName: this.displayName,
      furiganaLastName: this.furiganaLastName,
      furiganaFirstName: this.furiganaFirstName,
      avatarURL: this.avatarURL,
      position: this.position,
      department: this.department
    }
  }

  static mock(): UserEntity {
    const user = new UserEntity()
    user.email = 'admin'
    return user
  }
}


export interface IPagedUserListInterface {
  results: UserEntity[]
  next: string
  previous: string
  totalPages: number
  count: number,
  currentPageNumber: number
}

export class PagedUserListEntity extends PagedListEntity<UserEntity> {

  setFromApiModel(model: IListUserModel): void {
    super.setFromApiModel(model)
    const results: UserEntity[] = []
    model.results.forEach(element => {
      const user = new UserEntity()
      user.setFromApiModel(element)
      results.push(user.getCurrentValues() as UserEntity)
    });
    this.results = results
  }

  getCurrentValues(): IPagedUserListInterface{
    return {
      results: this.results,
      next: this.next,
      previous: this.previous,
      count: this.count,
      totalPages: this.totalPages,
      currentPageNumber: this.currentPageNumber
    }
  }
}
