import {
    SidebarContainer
} from '../../component/common/sidebar/sidebar.container'
import { ContentHeaderContainer } from '../../component/common/contentHeader/contentHeader.container';
import { useAppSelector } from '../../../presenters/store/hooks'

import { ITabItems } from '../../../../domain/entities/active-tab-component.entity'
import { IBreadCrumbItems } from '../../../../domain/entities/breadcrumb-component.entity';

interface DashboardProps {
}
  
export const DashboardView:React.FC<DashboardProps> = (props) => {

    const currentPage = "dashboard"
    const currentPageTitle = "ダッシュボード"
    const highLight = "dashboard"

    const breadCrumbs: IBreadCrumbItems[] = [
        {
            name: currentPageTitle,
            to: "/dashboard"
        }
    ]

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

    return (
        <>
            <SidebarContainer
                currentPage={currentPage}
                currentPageTitle={currentPageTitle}
                highLight={highLight}
            />
            <div className={`transition-width ease-in-out duration-500 ${contentClasses}`}>
                <ContentHeaderContainer
                    currentPage={currentPage}
                    currentPageTitle={currentPageTitle}
                    tabItems={tabItems}
                    breadCrumbs={breadCrumbs}
                />
                <span>
                    Dashboard Content
                </span>
            </div>
        </>
    );
}