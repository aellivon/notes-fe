import { TabComponentView } from './tabComponent.view'
import { useAppSelector } from '../../../core/services/store/hooks'
import TabComponentController from './tabComponent.controller'

import { ITabItems } from '../../../core/domain/active-tab-component.entity'


export interface ITabComponentContainerViewModel {
  items: ITabItems[]
}

export const TabComponentContainer: React.FC<ITabComponentContainerViewModel> = (props) => {
  const currentUser = useAppSelector(state => state.authState.user);

  const controller = new TabComponentController()

  return (
    <TabComponentView items={props.items} />
  )
}
