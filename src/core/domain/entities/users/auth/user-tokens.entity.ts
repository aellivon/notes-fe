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
    auth.accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg3MzE4MDIxLCJpYXQiOjE2ODczMTQ0MjEsImp0aSI6Ijk0MTZkZWQxMjg2MDQ1YjJiYTVhN2JjYWE2MzBjOTMxIiwidXNlcl9pZCI6MX0.XoaL5jLC8v59rCtn8w_Etg9a2f41_iOuSjlffq-iFi8"
    auth.refreshToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NzkxOTIyMSwiaWF0IjoxNjg3MzE0NDIxLCJqdGkiOiJmNmZjYTA0NGFjMzE0MDFhYWNiZWY4Mzg4ZDhmZTI4NyIsInVzZXJfaWQiOjF9.z3kaH49pQdBqJMuldzJWUS3yGBW9Gsv7VNclXAfVkIw"
    return auth
  }
}
