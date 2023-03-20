import {
    SidebarContainer
} from '../..//component/common/sidebar/sidebar.container'
import { ContentHeaderContainer } from '../../component/common/contentHeader/contentHeader.container';
import { useAppSelector } from '../../../core/services/store/hooks'

import { ITabItems } from '../../../core/domain/active-tab-component.entity'
import { IBreadCrumbItems } from '../../../core/domain/breadcrumb-component.entity';
import { HiMagnifyingGlass } from 'react-icons/hi2';

import { IconContext } from 'react-icons'

import { IPagedUserListInterface } from '../../../core/domain/users/user.entity';
import MemberCardContainer from '../../component/members/memberCard/memberCard.container';

import { PaginationContainer } from '../../component/common/pagination/pagination.container';

interface MemberProps {
    pagedUsers: IPagedUserListInterface
    onPageClickEvent: (pageNumber: number) => void
    onNextClickEvent: (url: string) => void
    onPreviousClickEvent: (url: string) => void
    onSearchEvent: () => void
    setqueryString: React.Dispatch<React.SetStateAction<string>>
    setDepartment: React.Dispatch<React.SetStateAction<string>>
    setType: React.Dispatch<React.SetStateAction<string>>
    setStatus: React.Dispatch<React.SetStateAction<string>>
}

export const MemberView:React.FC<MemberProps> = (props) => {

    const currentPage = "members"
    const currentPageTitle = "メンバー"
    const highLight = "members"

    const breadCrumbs: IBreadCrumbItems[] = [
        {
            name: currentPageTitle,
            to: "/members"
        }
    ]

    const tabItems: ITabItems[] = [
        {
            name: currentPageTitle,
            active: true,
            to: "/members"
        },
    ]

    const hiddenNavbar = useAppSelector(state => state.appUIState.hiddenNavbar);

    let contentClasses = ""
  
    if (hiddenNavbar) {
      contentClasses = "ml-0 xl:ml-64 pt-20 xl:pt-0"
    } else {    
      contentClasses = "ml-0 md:ml-64 pt-20 xl:pt-0"
    }

    return (
        <>
            <SidebarContainer
                currentPage={currentPage}
                currentPageTitle={currentPageTitle}
                highLight={highLight}
                adminGroupOpen={true}
            />
            <div className={`transition-width ease-in-out duration-500 ${contentClasses}`}>
                <ContentHeaderContainer
                    currentPage={currentPage}
                    currentPageTitle={currentPageTitle}
                    tabItems={tabItems}
                    breadCrumbs={breadCrumbs}
                />
                <span>
                    <form>
                        <div className='flex items-center bg-white my-2 mx-2 px-4 shadow-lg h-20'>
                            <input type="text" id="queryString" onChange={(e) => props.setqueryString(e.target.value)} className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Keywords" required />
                            <select defaultValue="all" id="department" onChange={(e) => props.setDepartment(e.target.value)} className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="all">All</option>   
                                <option value="sales">Sales</option>   
                                <option value="skilled">Skilled</option>
                            </select>
                            <select defaultValue="" id="type" onChange={(e) => props.setType(e.target.value)} className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="*">All</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                            <select defaultValue="" id="status" onChange={(e) => props.setStatus(e.target.value)} className="mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option value="active">Active</option>
                                <option value="archived">Archived</option>
                                <option value="*">All</option>
                            </select>
                            <button type="button" onClick={() => {
                                    props.onSearchEvent()
                                }}
                                className="flex items-center justify-center text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                <IconContext.Provider value={{ className:"w-5 h-5" }}>
                                    <HiMagnifyingGlass/>
                                </IconContext.Provider>
                            </button>
                        </div>
                    </form>
                    <span className='h-30vh hsm:h-50vh hmd:h-55vh hlg:h-60vh hxl:h-65vh overflow-y-scroll block'>
                        {
                            props.pagedUsers.results.map((element) => {
                                return <span key={element.id}>
                                    <MemberCardContainer
                                        member={element}
                                    />
                                </span>
                            })
                        }
                    </span>
                </span>
                <PaginationContainer
                    currentPageNumber={props.pagedUsers.currentPageNumber}
                    totalPages={props.pagedUsers.totalPages}
                    onPageClickEvent={props.onPageClickEvent}
                    onNextClickEvent={props.onNextClickEvent}
                    onPreviousClickEvent={props.onPreviousClickEvent}
                    previous={props.pagedUsers.previous}
                    next={props.pagedUsers.next}
                />
            </div>
        </>
    );
}