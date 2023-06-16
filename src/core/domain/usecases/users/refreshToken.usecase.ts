import AuthApiGateway from "../../../data/gateways/api/services/auth.gateway"
import AuthRepository from '../../../data/gateways/api/services/auth.repositories'


interface Params {
  refresh: string
}

export default class RefreshTokenUseCase {
  constructor (
    private readonly authApiGateway: AuthApiGateway,
    private readonly authRepository: AuthRepository
  ) {
  }
  async execute (form: Params): Promise<any> {
    try {
        const refreshToken = await this.authApiGateway.refresh({...form})
        const formattedTokenResponse = this.authApiGateway.getTokensFromResponse(refreshToken)
        this.authRepository.setUserTokens(formattedTokenResponse)
      } catch (error) {
        console.log({ error })
    }
  }
}

export const callRefresh = (refresh: Params) => {
  const usecase = new RefreshTokenUseCase(new AuthApiGateway(true), new AuthRepository())
  return usecase.execute(refresh)
}
