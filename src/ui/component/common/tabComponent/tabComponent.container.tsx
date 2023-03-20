import { TabComponentView } from './tabComponent.view'

import { ITabItems } from '../../../../core/domain/active-tab-component.entity'


export interface ITabComponentContainerViewModel {
  items: ITabItems[]
}

export const TabComponentContainer: React.FC<ITabComponentContainerViewModel> = (props) => {
  return (
    <TabComponentView items={props.items} />
  )
}
