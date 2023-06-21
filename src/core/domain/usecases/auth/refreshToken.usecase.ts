import AuthRepository from '../../../data/gateways/api/services/auth.repositories'
import RefreshAPIGateway from "../../../data/gateways/api/services/refresh.gateway"
import { callLogout } from '../logout/logout.case'

interface Params {
  refresh: string
}

export default class RefreshTokenUseCase {
  constructor (
    private readonly gateway: RefreshAPIGateway,
    private readonly authRepository: AuthRepository
  ) {
  }
  async execute (form: Params): Promise<any> {
    try {
        const refreshToken = await this.gateway.refresh({...form})
        const formattedTokenResponse = this.gateway.getTokensFromResponse(refreshToken)
        this.authRepository.setUserTokens(formattedTokenResponse)
      } catch (error) {
        callLogout()
        console.log({ error })
    }
  }
}

export const callRefresh = (refresh: Params) => {
  const usecase = new RefreshTokenUseCase(new RefreshAPIGateway(true), new AuthRepository())
  return usecase.execute(refresh)
}
