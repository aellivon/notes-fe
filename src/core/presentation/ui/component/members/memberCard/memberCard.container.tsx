import React from 'react'
import { MemberCardView } from './memberCard.view'

import UserEntity from '../../../../../domain/entities/users/user.entity'

export interface IMemberCardContainerModel {
  member: UserEntity
}

const MemberCardContainer: React.FC<IMemberCardContainerModel> = (props) => {
  return (
    <div>
      <MemberCardView
        member={props.member}
      />
    </div>        
  )
}

export default MemberCardContainer
