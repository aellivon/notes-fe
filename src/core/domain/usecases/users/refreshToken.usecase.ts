import AuthApiGateway from "../../../data/gateways/api/services/auth.gateway"

// import { PagedUserListEntity } from '../../domain/users/auth/user-profile-auth.entity'


interface Params {
  refresh?: string
}

export default class RefreshTokenUseCase {
  constructor (
    private readonly authApiGateway: AuthApiGateway,
  ) {
  }
  async execute ({refresh = ""}: Params): Promise<any> {

    try {
        // const refreshToken = await this.authApiGateway.refresh({refresh: ""})

        // user.setFromApiModel(refreshToken)
        // store.dispatch(setUser(user.getCurrentValues()))
  
        return {
          'success': true,
          'data': null
        }
      } catch (error) {
        console.log({ error })
        return {
          'success': false,
          'data': error
        }
    }
  }
}
