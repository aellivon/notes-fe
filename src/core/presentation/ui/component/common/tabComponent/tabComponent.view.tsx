import { Link } from "react-router-dom";

import { ITabItems } from '../../../../../domain/entities/active-tab-component.entity'

export interface ITabComponentViewModel {
  items: ITabItems[]
  hasButton: boolean
}

export const TabComponentView: React.FC<ITabComponentViewModel> = (props) => {

  const changeMargin = props.hasButton ? '-mt-3': ''

  return (
    <>
      <ul
        className={`mb-0 flex list-none flex-wrap border-b-0 px-2 flex-row ${changeMargin}`}
        role="tablist"
        data-te-nav-ref>
        {
          props.items.map((element, i) => {
            if(
              element.active === true
            ) {
              return <li className="text-center w-full justify-center sm:w-auto pb-0 mb-0" key={i}>
                <Link
                  to={element.to}
                  className={`flex mt-2 block px-7 md:px-7 pt-4 pb-3 text-xs font-medium uppercase leading-tight border-b-2 hover:bg-neutral-100 border-b-kbGreen text-kbGreen`}
                >
                  <span>
                    {element.name}
                  </span>
                </Link>
              </li>
            } else {
              return <li className="text-center w-full justify-center sm:w-auto" key={i}>
                <Link
                  to={element.to}
                  className={`flex mt-2 block px-7 md:px-7 pt-4 pb-3 text-xs font-medium uppercase leading-tight hover:border-b-2 hover:border-b-kbGreen hover:text-kbGreen text-neutral-500 hover:bg-neutral-100`}
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