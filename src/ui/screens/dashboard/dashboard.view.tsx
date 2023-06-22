import {
    SidebarContainer
} from '../../component/sidebar/sidebar.container'
  
interface DashboardProps {
}
  
export const DashboardView:React.FC<DashboardProps> = (props) => {
    const initialValues: any = { username: '', password: '' }
    return (
        <SidebarContainer
            currentPage="dashboard"
        />
    );
}