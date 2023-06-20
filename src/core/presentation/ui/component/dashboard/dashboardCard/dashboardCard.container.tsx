import React from 'react'

import { IKnowledgeBase } from '../../../../../domain/entities/knowledgebase/kb.entity'
import { DashboardCardView } from './dashboardCard.view'

export interface IDashboardCardContainerModel {
  kb: IKnowledgeBase
}

const DashboardCardContainer: React.FC<IDashboardCardContainerModel> = (props) => {

  return (
    <DashboardCardView
      kb={props.kb}
    />

  )
}

export default DashboardCardContainer
