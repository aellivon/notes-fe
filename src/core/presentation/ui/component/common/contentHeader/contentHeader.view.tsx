import { IAuthenticatedUserProfile } from '../../../../../domain/entities/users/auth/user-profile-auth.entity';
import { TabComponentContainer } from '../tabComponent/tabComponent.container'
import { Link } from "react-router-dom";

import { ITabItems } from '../../../../../domain/entities/active-tab-component.entity'
import { IBreadCrumbItems } from '../../../../../domain/entities/breadcrumb-component.entity'
import React from 'react';

export interface IContentHeaderViewModel {
  currentUser: IAuthenticatedUserProfile
  currentPageTitle: string
  tabItems?: ITabItems[]
  breadCrumbs?: IBreadCrumbItems[]
  children?: React.ReactNode
}

export const ContentHeaderView: React.FC<IContentHeaderViewModel> = (props) => {

  return (
    <div className='bg-white Primary border-b-2 border-solid lg:pt-8 pt-4 lg:h-28 w-full'>
      <div className="content-center pl-10 w-full flex flex-row justify-between">
        <div>
          {
            props.breadCrumbs?.map((element, i) => {
              let toRender = [
                <span className="w-auto" key={i}>
                  <Link
                    to={element.to}
                    className={i + 1 === props.breadCrumbs?.length ?
                      `text-xl text-gray-800` : `text-xl text-kbGreen`}
                  >
                    {element.name}
                  </Link>
                  {i + 1 !== props.breadCrumbs?.length ?
                    <> <span className='text-xl md:mx-4 mx-2 text-gray-800 cursor-default uppercase'>
                      {">"}
                    </span> <br className='sm:hidden' /> </> : null
                  }
                </span>
              ]
              return toRender
            })
          }
        </div>
        <div>
          {props.children}
        </div>
      </div>
      {props.tabItems ?
        <TabComponentContainer
          items={props.tabItems}
          hasButton={props.children ? true : false}
        />
        : null}
    </div>
  )
}
