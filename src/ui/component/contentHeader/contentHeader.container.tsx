import { ContentHeaderView } from './contentHeader.view'
import { useAppSelector } from '../../../core/services/store/hooks'
import ContentHeaderController from './contentHeader.controller'

import { ITabItems } from '../../../core/domain/active-tab-component.entity'

export interface IContentHeaderContainerViewModel {
  currentPage: string
  currentPageTitle:string
  tabItems: ITabItems[]
}

export const ContentHeaderContainer: React.FC<IContentHeaderContainerViewModel> = (props) => {
  const currentUser = useAppSelector(state => state.authState.user);

  const controller = new ContentHeaderController()

  return (
    <>
      <ContentHeaderView
        currentUser={currentUser}
        currentPageTitle={props.currentPageTitle}
        tabItems={props.tabItems}
      />
    </>

  )
}
