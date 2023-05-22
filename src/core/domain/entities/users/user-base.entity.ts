import { IBaseEntity } from '../base/base.entity'
import { IUserModel } from '../../../data/gateways/api/api.types'


export interface IBaseUserProfile {
  id: number
  email: string
  firstName: string
  lastName: string
  avatarURL: string
  displayName: string
}

export default class UserBaseEntity implements IBaseEntity {
  id: number = -1
  email: string = ''
  firstName: string = ''
  avatarURL: string = ''
  lastName: string = ''
  displayName: string = ''

  // setFromApiModel(model: IUserModel | any): void {
  //   this.id = model.id
  //   this.email = model.email
  //   this.firstName = model.first_name
  //   this.avatarURL = model.avatar_url
  //   this.displayName = model.display_name
  //   this.lastName = model.last_name
  // }

  setEntity(model: IBaseUserProfile) {
    this.id = model.id
    this.email = model.email
    this.firstName = model.firstName
    this.avatarURL = model.avatarURL
    this.displayName = model.displayName
    this.lastName = model.lastName
  }

  getCurrentValues(): IBaseUserProfile {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      displayName: this.displayName,
      avatarURL: this.avatarURL
    }
  }

  static mock(): UserBaseEntity {
    const user = new UserBaseEntity()
    user.email = 'admin'
    return user
  }
}
