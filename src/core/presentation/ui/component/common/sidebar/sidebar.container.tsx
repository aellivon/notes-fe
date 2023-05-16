import { SidebarView } from './sidebar.view'
import SidebarController from './sidebar.controller'
import { useAppSelector } from '../../../../presenters/store/hooks'

export interface ISidebarContainerViewModel {
  currentPage: string
  currentPageTitle: string
  highLight: string
  adminGroupOpen?: boolean
}

export const SidebarContainer: React.FC<ISidebarContainerViewModel> = (props) => {
  const currentUser = useAppSelector(state => state.authState.user);
  const navBarState = useAppSelector(state => state.appUIState.hiddenNavbar);

  const controller = new SidebarController()

  const logout = async () => {
    await controller.logout()
  }

  const setNavBar = async (state: boolean) => {
    await controller.setNavbarStatus(state)
  } 

  return (
    <SidebarView
      currentUser={currentUser}
      logOutFunc={logout}
      setNavBarFunc={setNavBar}
      navBarState={navBarState}
      highLight={props.highLight}
      adminGroupOpen={props.adminGroupOpen}
    />
  )
}
