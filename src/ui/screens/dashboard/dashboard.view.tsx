import {
    SidebarContainer
} from '../../component/sidebar/sidebar.container'
import { useAppSelector } from '../../../core/services/store/hooks'

interface DashboardProps {
}
  
export const DashboardView:React.FC<DashboardProps> = (props) => {

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
                currentPage="dashboard"
            />
            <div className={`flex flex-grow transition-width ease-in-out duration-500 ${contentClasses}`}>
                Test
            </div>
        </>

    );
}