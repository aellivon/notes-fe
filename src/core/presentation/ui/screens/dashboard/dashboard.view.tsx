import {
    SidebarContainer
} from '../../component/common/sidebar/sidebar.container'
import { useAppSelector } from '../../../presenters/store/hooks'
import { IPagedKnowledgebaseInterface } from '../../../../domain/entities/knowledgebase/kb.entity'
import { PaginationContainer } from '../../component/common/pagination/pagination.container'
import DashboardCardContainer from '../../component/dashboard/dashboardCard/dashboardCard.container'


interface DashboardProps {
    pagedNotes: IPagedKnowledgebaseInterface
    onPageClickEvent: (pageNumber: number) => void
    onNextClickEvent: (url: string) => void
    onPreviousClickEvent: (url: string) => void
}

export const DashboardView: React.FC<DashboardProps> = (props) => {

    const currentPage = "dashboard"
    const currentPageTitle = "Dashboard"
    const highLight = "dashboard"

    const hiddenNavbar = useAppSelector(state => state.appUIState.hiddenNavbar);

    let contentClasses = ""

    if (hiddenNavbar) {
        contentClasses = "ml-10 xl:ml-64 pt-20 xl:pt-0"
    } else {
        contentClasses = "ml-10 md:ml-64 pt-20 xl:pt-0"
    }

    return (
        <>
            <SidebarContainer
                currentPage={currentPage}
                currentPageTitle={currentPageTitle}
                highLight={highLight}
            />
            <div className={`transition-width ease-in-out duration-500 ${contentClasses}`}>
                <div className='h-80vh block flex p-8 gap-8 overflow-y-scroll justify-center flex-col lg:flex-row lg:grid lg:grid-cols-4'>
                    {
                        props.pagedNotes.results.map((element, index) => {
                            return <DashboardCardContainer
                                key={index}
                                kb={element}
                            />
                        })
                    }
                  
                </div>
                <PaginationContainer
                    currentPageNumber={props.pagedNotes.currentPageNumber}
                    totalPages={props.pagedNotes.totalPages}
                    onPageClickEvent={props.onPageClickEvent}
                    onNextClickEvent={props.onNextClickEvent}
                    onPreviousClickEvent={props.onPreviousClickEvent}
                    previous={props.pagedNotes.previous}
                    next={props.pagedNotes.next}
                />
            </div >

        </>
    );
}