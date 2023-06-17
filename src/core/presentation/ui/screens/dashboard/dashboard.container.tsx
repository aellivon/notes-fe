import React from 'react'
import { DashboardView } from './dashboard.view'

const DashboardContainer: React.FC = () => {
  return (
    <div className='h-screen bg-no-repeat bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1497250681960-ef046c08a56e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80)] '>
      <DashboardView/>
    </div>        
  )
}

export default DashboardContainer
