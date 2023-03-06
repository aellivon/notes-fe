import React, { useState } from 'react'
import DashboardController from './dashboard.controller'
import { DashboardView } from './dashboard.view'

const DashboardContainer: React.FC = () => {
  const controller = new DashboardController()
  const logout = async () => {
    const response = await controller.logout()
  }

  return (
    <span>
      <DashboardView
        onLogout={logout}
      />
    </span>
  )
}

export default DashboardContainer
