import UserBaseEntity, { IBaseUserProfile } from '../user-base.entity'

import { ILoginResponseDataModel, IRefreshResponseDataModel } from '../../../../data/gateways/api/api.types'

export interface IAuthenticatedUserProfile extends IBaseUserProfile {
  id: number
  email: string
  firstName: string
  lastName: string
  displayName: string
  accessToken?: string
  refreshToken?: string
  avatarURL: string
}

export default class UserProfileAuthEntity extends UserBaseEntity {
  accessToken?: string = ''
  refreshToken?: string = ''

  setTokens(model: IRefreshResponseDataModel): void {
    this.accessToken = model.access
    this.refreshToken = model.refresh
  }

  getCurrentValues(): IAuthenticatedUserProfile {
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
