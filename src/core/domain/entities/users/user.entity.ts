import UserBaseEntity, { IBaseUserProfile } from './user-base.entity'

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

  setEntity(model: IUserProfile): void {
    super.setEntity(model)
    this.furiganaFirstName = model.furiganaFirstName
    this.furiganaLastName = model.furiganaLastName
    this.avatarURL = model.avatarURL
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
  results: IUserProfile[]
  next: string
  previous: string
  totalPages: number
  count: number,
  currentPageNumber: number
}

export class PagedUserListEntity extends PagedListEntity<IUserProfile> {

  setEntity(model: IPagedUserListInterface): void {
    super.setEntity(model)
    this.results = model.results
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
