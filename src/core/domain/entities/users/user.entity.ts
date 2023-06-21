import UserBaseEntity, { IBaseUserProfile } from './user-base.entity'

import PagedListEntity from '../base/base.paged.entity'


export interface IUserProfile extends IBaseUserProfile {
  furiganaLastName?: string
  furiganaFirstName?: string
  avatarURL: string
  position?: string
  department?: string
  dateJoined?: string
}

export default class UserEntity extends UserBaseEntity {
  furiganaFirstName?: string = ''
  furiganaLastName?: string = ''
  position?: string = ''
  department?: string = ''
  dateJoined?: string = ''

  setEntity(model: IUserProfile): void {
    super.setEntity(model)
    this.furiganaFirstName = model.furiganaFirstName
    this.furiganaLastName = model.furiganaLastName
    this.avatarURL = model.avatarURL
    this.position = model.position
    this.department = model.department
    this.dateJoined = model.dateJoined
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
      department: this.department,
      dateJoined: this.dateJoined
    }
  }

  static mock(): UserEntity {
    const user = new UserEntity()
    user.setEntity({
      id: 1,
      email: "john@sunny.com",
      firstName: "John",
      lastName: "Doe",
      displayName: "John Doe",
      furiganaLastName: "ドウ",
      furiganaFirstName: "ジョン",
      avatarURL: "http://localhost:8000/media/profile_pictures/908d4a04-fb5.png",
      position: "Software Developer",
      department: "IT Department",
      dateJoined: "2021-03-18T11:47:25+09:00",
    })
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
