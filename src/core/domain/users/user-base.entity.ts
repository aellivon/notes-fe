import { IBaseEntity } from '../base/base.entity'
import { IUserModel } from '../api/api.types'


export interface IBaseUserProfile {
  id: number
  email?: string
  firstName?: string
  lastName?: string
  avatarURL?: string
  displayName?: string
}

export default class UserBaseEntity implements IBaseEntity {
  id: number = -1
  email: string = ''
  firstName: string = ''
  avatarURL?: string = ''
  lastName: string = ''
  displayName: string = ''

  setFromApiModel(model: IUserModel | any): void {
    this.id = model.id
    this.email = model.email
    this.firstName = model.first_name
    this.avatarURL = model.avatar_url
    this.displayName = model.display_name
    this.lastName = model.last_name
  }

  getCurrentValues(): IBaseUserProfile {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      displayName: this.displayName
    }
  }

  static mock(): UserBaseEntity {
    const user = new UserBaseEntity()
    user.email = 'admin'
    return user
  }
}
