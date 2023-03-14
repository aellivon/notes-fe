import { IUserProfile } from '../../../core/domain/user-profile-interface.type'
import { TabComponentContainer } from '../tabComponent/tabComponent.container'
import { Link } from "react-router-dom";

import { ITabItems } from '../../../core/domain/active-tab-component.entity'
import { IBreadCrumbItems } from '../../../core/domain/breadcrumb-component.entity'

export interface IContentHeaderViewModel {
  currentUser: IUserProfile
  currentPageTitle: string
  tabItems: ITabItems[]
  breadCrumbs: IBreadCrumbItems[]
}

export const ContentHeaderView: React.FC<IContentHeaderViewModel> = (props) => {

  return (
    <div className='bg-white border-b-2 border-solid pt-8 lg:h-28 w-full'>
      <div className="content-center pl-10 w-full">
        {
          props.breadCrumbs.map((element, i) => {
            let toRender = [
              <span className="w-auto" key={i}>
                <Link
                  to={element.to}
                  className={i + 1 === props.breadCrumbs.length ?
                    `text-xl text-gray-500` : `text-xl text-blue-500`}
                >
                  {element.name}
                </Link>
                {i + 1 !== props.breadCrumbs.length ?
                  <> <span className='text-xl md:mx-4 mx-2 text-gray-500 cursor-default'>
                      {">"}
                  </span> <br className='sm:hidden'/> </>: null
                }
              </span>
            ]
            return toRender
          })
        }
      </div>
      <TabComponentContainer
        items={props.tabItems}
      />
    </div>
  )
}
