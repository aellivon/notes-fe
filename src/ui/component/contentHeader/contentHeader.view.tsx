import { IUserProfile } from '../../../core/domain/user-profile-interface.type'
import { TabComponentContainer } from '../tabComponent/tabComponent.container'
import { Link } from "react-router-dom";

import { ITabItems } from '../../../core/domain/active-tab-component.entity'

export interface IContentHeaderViewModel {
  currentUser: IUserProfile
  currentPageTitle: string
  tabItems: ITabItems[]
}

export const ContentHeaderView: React.FC<IContentHeaderViewModel> = (props) => {

  return (
    <div className='bg-white border-b-2 border-solid pt-8 lg:h-28'>
      <div className="content-center pl-10 hidden md:flex md-flex-row">  
        <Link
          to={props.currentPageTitle}
          className={`text-xl text-gray-500`}
        >
          {props.currentPageTitle}
        </Link>
        <span className='text-xl mx-4 text-gray-500'>
            {">"}
        </span>
        <Link
          to={props.currentPageTitle}
          className={`text-xl text-blue-500`}
        >
          {props.currentPageTitle}
        </Link>
      </div>
      <TabComponentContainer
        items={props.tabItems}
      />
    </div>
  )
}
