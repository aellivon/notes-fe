import { Fragment } from 'react'
import { Navigator } from './core/presentation/ui/navigator'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css';

export const App = () => {
  return (
    <Fragment>
      <ToastContainer />
      <Navigator />
    </Fragment>
  )
}