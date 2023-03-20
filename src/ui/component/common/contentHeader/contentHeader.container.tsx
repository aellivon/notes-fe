import { ContentHeaderView } from './contentHeader.view'
import { useAppSelector } from '../../../../core/services/store/hooks'

import { ITabItems } from '../../../../core/domain/active-tab-component.entity'
import { IBreadCrumbItems } from '../../../../core/domain/breadcrumb-component.entity'

export interface IContentHeaderContainerViewModel {
  currentPage: string
  currentPageTitle:string
  tabItems: ITabItems[]
  breadCrumbs: IBreadCrumbItems[]
}

export const ContentHeaderContainer: React.FC<IContentHeaderContainerViewModel> = (props) => {
  const currentUser = useAppSelector(state => state.authState.user);

  return (
    <>
      <ContentHeaderView
        currentUser={currentUser}
        currentPageTitle={props.currentPageTitle}
        tabItems={props.tabItems}
        breadCrumbs={props.breadCrumbs}
      />
    </>

  )
}
