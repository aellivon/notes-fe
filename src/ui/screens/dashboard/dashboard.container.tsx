import React, { useState } from 'react'
import DashboardController from './dashboard.controller'
import { DashboardView } from './dashboard.view'

const DashboardContainer: React.FC = () => {
  return (
    <div className='bg-gray-100 h-screen'>
      <DashboardView/>
    </div>        
  )
}

export default DashboardContainer
