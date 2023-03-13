import {
    SidebarContainer
} from '../../component/sidebar/sidebar.container'
import { ContentHeaderContainer } from '../../component/contentHeader/contentHeader.container';
import { useAppSelector } from '../../../core/services/store/hooks'

import { ITabItems } from '../../../core/domain/active-tab-component.entity'
import { MdOutlineRecordVoiceOver } from "react-icons/md";

interface DashboardProps {
}
  
export const DashboardView:React.FC<DashboardProps> = (props) => {

    const currentPage = "dashboard"
    const currentPageTitle = "ダッシュボード"

    const tabItems: ITabItems[] = [
        {
            name: currentPageTitle,
            active: true,
            to: "/dashboard"
        },
    ]

    const hiddenNavbar = useAppSelector(state => state.appUIState.hiddenNavbar);

    let contentClasses = ""
  
    if (hiddenNavbar) {
      contentClasses = "ml-0 xl:ml-64 pt-20 xl:pt-0"
    } else {
      contentClasses = "ml-0 md:ml-64 pt-20 xl:pt-0"
    }

    const initialValues: any = { username: '', password: '' }
    return (
        <>
            <SidebarContainer
                currentPage={currentPage}
                currentPageTitle={currentPageTitle}
            />
            <div className={`transition-width ease-in-out duration-500 ${contentClasses}`}>
                <ContentHeaderContainer
                    currentPage={currentPage}
                    currentPageTitle={currentPageTitle}
                    tabItems={tabItems}
                />
                <span>
                    Dashboard Content
                </span>
            </div>
        </>
    );
}