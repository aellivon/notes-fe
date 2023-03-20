import UserBaseEntity from '../user-base.entity'

import { ILoginResponseDataModel } from '../../api/api.types'

export interface IUserProfile {
  id: number
  email?: string
  firstName?: string
  lastName?: string
  displayName?: string
  accessToken?: string
  refreshToken?: string
  avatarURL?: string
}

export default class UserProfileAuthEntity extends UserBaseEntity {
  accessToken?: string = ''
  refreshToken?: string = ''

  setFromApiModel(model: ILoginResponseDataModel): void {
    this.id = model.user.id
    this.email = model.user.email
    this.firstName = model.user.first_name
    this.displayName = model.user.display_name
    this.lastName = model.user.last_name
    this.accessToken = model.access_token
    this.refreshToken = model.refresh_token
    this.avatarURL = model.user.avatar_url
  }

  getCurrentValues(): IUserProfile {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
      displayName: this.displayName,
      avatarURL: this.avatarURL,
    }
  }

  static mock(): UserProfileAuthEntity {
    const user = new UserProfileAuthEntity()
    user.email = 'admin'
    return user
  }
}

