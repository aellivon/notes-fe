import { ContentHeaderView } from './contentHeader.view'

import { ITabItems } from '../../../../../domain/entities/active-tab-component.entity'
import { IBreadCrumbItems } from '../../../../../domain/entities/breadcrumb-component.entity'

import { useAppSelector } from '../../../../presenters/store/hooks'


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
