export interface IAuthenticationTokens {
  accessToken?: string
  refreshToken?: string
}

export default class UserAuthEntity {
  accessToken?: string = ''
  refreshToken?: string = ''

  setEntity(model: IAuthenticationTokens): void {
    this.accessToken = model.accessToken
    this.refreshToken = model.refreshToken
  }

  getCurrentValues(): IAuthenticationTokens {
    return {
      accessToken: this.accessToken,
      refreshToken: this.refreshToken,
    }
  }

  static mock(): UserAuthEntity {
    const auth = new UserAuthEntity()
    auth.accessToken = 'ASDFGH'
    return auth
  }
}
