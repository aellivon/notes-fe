import { useState } from 'react'
import { SidebarView } from './sidebar.view'
import classes from './sidebar.module.css'
import { useAppSelector } from '../../../core/services/store/hooks'


export interface ISidebarContainerViewModel {
  currentPage: string
}

export const SidebarContainer: React.FC<ISidebarContainerViewModel> = (props) => {
  const currentUser = useAppSelector(state => state.authState.user);
  console.log(currentUser)

  return (
    <SidebarView
      currentUser={currentUser}
    />
  )
}
