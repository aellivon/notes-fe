import { ILoginResponseDataModel } from './api/api.types'

interface IBaseEntity {
  setFromApiModel: (model: any) => void
}


export default class UserProfileAuthEntity implements IBaseEntity {
  id: number = -1
  email?: string = ''
  firstName?: string = ''
  lastName?: string = ''
  accessToken?: string = ''
  refreshToken?: string = ''

  setFromApiModel(model: ILoginResponseDataModel): void {
    console.log(model)
    this.id = model.user.id
    this.email = model.user.email
    this.firstName = model.user.first_name
    this.lastName = model.user.last_name
    this.accessToken = model.access_token
    this.refreshToken = model.refresh_token
  }

  getCurrentValues() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      accessToken: this.accessToken,
      refreshToken: this.refreshToken
    }
  }

  static mock(): UserProfileAuthEntity {
    const user = new UserProfileAuthEntity()
    user.email = 'admin'
    return user
  }
}
