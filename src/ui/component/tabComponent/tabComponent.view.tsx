import { Link } from "react-router-dom";

import { ITabItems } from '../../../core/domain/active-tab-component.entity'

export interface ITabComponentViewModel {
  items: ITabItems[]
}

export const TabComponentView: React.FC<ITabComponentViewModel> = (props) => {
  return (
    <>
      <ul
        className="mb-0 flex list-none flex-wrap border-b-0 px-2 flex-row"
        role="tablist"
        data-te-nav-ref>
        {
          props.items.map((element, i) => {
            if(
              element.active === true
            ) {
              return <li className="text-center w-full justify-center sm:w-auto pb-0 mb-0">
                <Link
                  to={element.to}
                  className={`flex mt-2 block px-7 md:px-7 pt-4 pb-3 text-xs font-medium uppercase leading-tight border-b-2 hover:bg-neutral-100 border-b-blue-500 text-blue-500`}
                >
                  <span>
                    {element.name}
                  </span>
                </Link>
              </li>
            } else {
              return <li className="text-center w-full justify-center sm:w-auto">
                <Link
                  to={element.to}
                  className={`flex mt-2 block px-7 md:px-7 pt-4 pb-3 text-xs font-medium uppercase leading-tight hover:border-b-2 hover:border-b-blue-300 hover:text-blue-300 text-neutral-500 hover:bg-neutral-100`}
                >
                  <span>
                    {element.name}
                  </span>
                </Link>
              </li>
            }
          })
        }
      </ul>
    </>
  )
}