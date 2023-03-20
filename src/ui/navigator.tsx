import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
  } from 'react-router-dom'
import LoginFormContainer from './screens/login/login.container'
import DashboardContainer from './screens/dashboard/dashboard.container'
import MemberContainer from './screens/members/members.container'
import { useAppSelector } from '../core/services/store/hooks'
  
export const Navigator = () => {
  const currentUser = useAppSelector(state => state.authState.user);

  const PrivateRoute: React.FC<{ element: any }> = (props) => {
    const userInfo = currentUser;
    let invalidUser = false
    if (!userInfo.id || userInfo.id <= 0 || !userInfo.accessToken || !userInfo.refreshToken) {
      invalidUser = true
    }
    return invalidUser ? <Navigate to='/' /> : props.element  
  }

  const AlreadyLoggedInRoute: React.FC<{ element: any }> = (props) => {
    const userInfo = currentUser;
    let alreadyLoggedIn = false
    if (userInfo && userInfo.id && userInfo.id > 0 && userInfo.accessToken && userInfo.refreshToken) {
      alreadyLoggedIn = true
    }
    return alreadyLoggedIn ? <Navigate to='/dashboard' /> : props.element  
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<AlreadyLoggedInRoute element={<LoginFormContainer />} />} />
        <Route path='/dashboard' element={<PrivateRoute element={<DashboardContainer />} />} />
        <Route path='/members' element={<PrivateRoute element={<MemberContainer />} />} />
        <Route path="*" element={<Navigate to="/"/>} />
      </Routes>
    </BrowserRouter>
  )
}
