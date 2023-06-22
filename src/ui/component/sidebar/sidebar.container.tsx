import { useState } from 'react'
import { SidebarView } from './sidebar.view'
import classes from './sidebar.module.css'
import { useAppSelector } from '../../../core/services/store/hooks'
import SidebarController from './sidebar.controller'


export interface ISidebarContainerViewModel {
  currentPage: string
}

export const SidebarContainer: React.FC<ISidebarContainerViewModel> = (props) => {
  const currentUser = useAppSelector(state => state.authState.user);

  const controller = new SidebarController()
  const logout = async () => {
    await controller.logout()
  }

  return (
    <SidebarView
      currentUser={currentUser}
      logOutFunc={logout}
    />
  )
}
