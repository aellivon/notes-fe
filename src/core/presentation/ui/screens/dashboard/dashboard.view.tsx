import {
    SidebarContainer
} from '../../component/common/sidebar/sidebar.container'
import { useAppSelector } from '../../../presenters/store/hooks'


interface DashboardProps {
}
  
export const DashboardView:React.FC<DashboardProps> = (props) => {

    const currentPage = "dashboard"
    const currentPageTitle = "Dashboard"
    const highLight = "dashboard"

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
            />
            <div className={`transition-width ease-in-out duration-500 ${contentClasses}`}>
                <div>
                <span>
                    Dashboard Content
                </span>
                </div>
                
            </div>
        </>
    );
}