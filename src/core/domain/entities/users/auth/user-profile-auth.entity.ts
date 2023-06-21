import UserBaseEntity, { IBaseUserProfile } from '../user-base.entity'

export interface IAuthenticatedUserProfile extends IBaseUserProfile {
  id: number
  email: string
  firstName: string
  lastName: string
  displayName: string
  avatarURL: string
}

export default class UserProfileAuthEntity extends UserBaseEntity {

  setEntity(model: IAuthenticatedUserProfile): void {
    this.id = model.id
    this.email = model.email
    this.firstName = model.firstName
    this.displayName = model.displayName
    this.lastName = model.lastName
  }

  getCurrentValues(): IAuthenticatedUserProfile {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      displayName: this.displayName,
      avatarURL: this.avatarURL,
    }
  }

  static mock(): UserProfileAuthEntity {
    const user = new UserProfileAuthEntity()
    user.id = 1
    user.email = "john@sunny.com"
    user.firstName = "John"
    user.lastName = "Doe"
    user.displayName = "John Doe"
    user.avatarURL = "http://localhost:8000/media/profile_pictures/908d4a04-fb5.png"
    return user
  }
}
