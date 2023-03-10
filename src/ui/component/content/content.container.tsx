import { HeaderView } from './content.view'
import { useAppSelector } from '../../../core/services/store/hooks'
import HeaderController from './content.controller'


export interface IHeaderContainerViewModel {
  currentPage: string
}

export const HeaderContainer: React.FC<IHeaderContainerViewModel> = (props) => {
  const currentUser = useAppSelector(state => state.authState.user);

  const controller = new HeaderController()
  const logout = async () => {
    // await controller.logout()
  }

  return (
    <HeaderView
      currentUser={currentUser}
    />
  )
}
