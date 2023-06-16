import AuthRepository from '../../../data/gateways/api/services/auth.repositories'

export default class LogOutCase {

  constructor (
    private readonly authRepository: AuthRepository
  ) {
  }
  
  async execute (): Promise<any> {
    try {
      this.authRepository.clearLoggedInUser()
    } catch (error) {
      console.log({ error })
    }
  }
}

export const callLogout = () => {
  const usecase = new LogOutCase(new AuthRepository())
  return usecase.execute()
}
