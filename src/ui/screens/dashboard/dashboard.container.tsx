import React, { useState } from 'react'
import DashboardController from './dashboard.controller'
import { DashboardView } from './dashboard.view'

const DashboardContainer: React.FC = () => {
  const controller = new DashboardController()
  const logout = async () => {
    const response = await controller.logout()
  }

  return (
    <div className='bg-gray-100 h-screen'>
      <DashboardView
        onLogout={logout}
      />
    </div>
  )
}

export default DashboardContainer
